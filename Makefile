# Help command to display all available commands
help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# Development commands
dev: ## Build and run the development server
	docker-compose up --build -d

logs: ## Show logs for the development server
	docker-compose logs --tail=100 -f

# Portfolio-specific commands
portfolio-dev: ## Build and run the portfolio in development mode
	docker-compose -f docker-compose.yml up --build portfolio-dev

portfolio-prod: ## Build and run the portfolio in production mode
	docker-compose -f docker-compose.prod.yml up --build portfolio-prod

portfolio-logs: ## Show logs for the portfolio application
	docker-compose logs --tail=100 -f portfolio

portfolio-down: ## Take down running containers of the portfolio
	docker-compose down

# Test commands for the portfolio
portfolio-test: ## Run tests for the portfolio application
	docker-compose -f docker-compose.yml run portfolio-dev npx nx test portfolio

# Build commands for static files if needed
portfolio-build: ## Build static files for the portfolio project
	docker-compose -f docker-compose.prod.yml run portfolio-prod npx nx build portfolio --prod

clean: ## Clean up dangling images and prune volumes
	docker system prune -af
	docker volume prune -f
