import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the logger
vi.mock("@guyromellemagayano/logger", () => ({
  logError: vi.fn(),
  logInfo: vi.fn(),
}));

// Mock fs
vi.mock("fs", () => ({
  default: {
    existsSync: vi.fn(),
    mkdirSync: vi.fn(),
    writeFileSync: vi.fn(),
  },
}));

// Mock path
vi.mock("path", () => ({
  default: {
    join: vi.fn((...args) => args.join("/")),
    dirname: vi.fn(),
  },
}));

// Import the functions to test
import {
  validateComponentName,
  createServerTemplate,
  createClientTemplate,
  createStylesTemplate,
  createTestTemplate,
  createReadmeTemplate,
  generateFileTemplates,
  scaffoldComponent,
  type ScaffoldOptions,
} from "../scaffold-component";

describe("scaffold-component library", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("validateComponentName", () => {
    it("should validate correct PascalCase names", () => {
      const validNames = [
        "MyComponent",
        "Button",
        "UserProfile",
        "A",
        "Test123",
      ];

      validNames.forEach((name) => {
        const result = validateComponentName(name);
        expect(result.isValid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    it("should reject empty names", () => {
      const result = validateComponentName("");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Component name cannot be empty");
    });

    it("should reject names starting with lowercase", () => {
      const result = validateComponentName("myComponent");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "Component name must be in PascalCase (e.g., MyComponent)"
      );
    });

    it("should reject names with special characters", () => {
      const invalidNames = [
        "My-Component",
        "My_Component",
        "My Component",
        "My@Component",
      ];

      invalidNames.forEach((name) => {
        const result = validateComponentName(name);
        expect(result.isValid).toBe(false);
        expect(result.error).toBe(
          "Component name must be in PascalCase (e.g., MyComponent)"
        );
      });
    });

    it("should reject names starting with numbers", () => {
      const result = validateComponentName("1Component");
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(
        "Component name must be in PascalCase (e.g., MyComponent)"
      );
    });
  });

  describe("createServerTemplate", () => {
    it("should generate server component template", () => {
      const template = createServerTemplate("TestComponent");

      expect(template).toContain("export interface TestComponentProps");
      expect(template).toContain("const TestComponent = React.forwardRef");
      expect(template).toContain("TestComponent.displayName = 'TestComponent'");
      expect(template).toContain("import './styles.css'");
    });

    it("should handle different component names", () => {
      const template = createServerTemplate("Button");

      expect(template).toContain("export interface ButtonProps");
      expect(template).toContain("const Button = React.forwardRef");
      expect(template).toContain("Button.displayName = 'Button'");
    });
  });

  describe("createClientTemplate", () => {
    it("should generate client component template", () => {
      const template = createClientTemplate("TestComponent");

      expect(template).toContain('"use client"');
      expect(template).toContain(
        "import ServerComponent, { TestComponentProps }"
      );
      expect(template).toContain("const TestComponentClient = React.memo");
      expect(template).toContain(
        "TestComponentClient.displayName = 'TestComponentClient'"
      );
    });
  });

  describe("createStylesTemplate", () => {
    it("should generate styles template", () => {
      const template = createStylesTemplate("TestComponent");

      expect(template).toContain(".component-name {");
      expect(template).toContain("/* BEM base styles for TestComponent */");
    });
  });

  describe("createTestTemplate", () => {
    it("should generate test template", () => {
      const template = createTestTemplate("TestComponent");

      expect(template).toContain("import TestComponent from './index'");
      expect(template).toContain("describe('TestComponent'");
      expect(template).toContain("render(<TestComponent>Test</TestComponent>)");
    });
  });

  describe("createReadmeTemplate", () => {
    it("should generate README template", () => {
      const template = createReadmeTemplate("TestComponent");

      expect(template).toContain("# TestComponent");
      expect(template).toContain(
        "import { TestComponent } from '@guyromellemagayano/components'"
      );
      expect(template).toContain("TestComponentProps");
      expect(template).toContain("testcomponent"); // lowercase for test files
    });
  });

  describe("generateFileTemplates", () => {
    it("should generate all required file templates", () => {
      const templates = generateFileTemplates("TestComponent");

      expect(templates).toHaveLength(5);

      const fileNames = templates.map((t) => t.file);
      expect(fileNames).toContain("index.tsx");
      expect(fileNames).toContain("index.client.tsx");
      expect(fileNames).toContain("styles.css");
      expect(fileNames).toContain("README.md");
      expect(fileNames).toContain("index.test.tsx");
    });

    it("should include component name in all templates", () => {
      const templates = generateFileTemplates("MyButton");

      templates.forEach((template) => {
        expect(template.content).toContain("MyButton");
      });
    });
  });

  describe("scaffoldComponent", () => {
    const mockOptions: ScaffoldOptions = {
      name: "TestComponent",
      overwrite: false,
    };

    it("should successfully scaffold a component", async () => {
      const result = await scaffoldComponent(mockOptions, "/tmp/test");

      expect(result.success).toBe(true);
      expect(result.filesCreated).toHaveLength(5);
      expect(result.errors).toHaveLength(0);

      expect(mockFs.mkdirSync).toHaveBeenCalledWith("/tmp/test/testcomponent", {
        recursive: true,
      });

      expect(mockFs.writeFileSync).toHaveBeenCalledTimes(5);
    });

    it("should create directory if it doesn't exist", async () => {
      mockFs.existsSync.mockReturnValue(false);

      await scaffoldComponent(mockOptions, "/tmp/test");

      expect(mockFs.mkdirSync).toHaveBeenCalledWith("/tmp/test/testcomponent", {
        recursive: true,
      });
    });

    it("should not create directory if it already exists", async () => {
      mockFs.existsSync.mockReturnValue(true);

      await scaffoldComponent(mockOptions, "/tmp/test");

      expect(mockFs.mkdirSync).not.toHaveBeenCalled();
    });

    it("should handle invalid component names", async () => {
      const invalidOptions: ScaffoldOptions = {
        name: "invalid-name",
        overwrite: false,
      };

      const result = await scaffoldComponent(invalidOptions, "/tmp/test");

      expect(result.success).toBe(false);
      expect(result.filesCreated).toHaveLength(0);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toContain("PascalCase");
    });

    it("should handle empty component names", async () => {
      const invalidOptions: ScaffoldOptions = {
        name: "",
        overwrite: false,
      };

      const result = await scaffoldComponent(invalidOptions, "/tmp/test");

      expect(result.success).toBe(false);
      expect(result.filesCreated).toHaveLength(0);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toContain("cannot be empty");
    });

    it("should handle file write errors", async () => {
      const writeError = new Error("Permission denied");
      mockFs.writeFileSync.mockImplementation(() => {
        throw writeError;
      });

      const result = await scaffoldComponent(mockOptions, "/tmp/test");

      expect(result.success).toBe(false);
      expect(result.errors).toHaveLength(5); // All files failed
      expect(result.errors[0]).toContain("Failed to create");
    });

    it("should handle directory creation errors", async () => {
      const mkdirError = new Error("Permission denied");
      mockFs.mkdirSync.mockImplementation(() => {
        throw mkdirError;
      });

      const result = await scaffoldComponent(mockOptions, "/tmp/test");

      expect(result.success).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toContain("Scaffolding failed");
    });

    it("should respect overwrite flag", async () => {
      mockFs.existsSync.mockImplementation((path) => {
        return path.toString().includes("index.tsx");
      });

      const overwriteOptions: ScaffoldOptions = {
        name: "TestComponent",
        overwrite: true,
      };

      const result = await scaffoldComponent(overwriteOptions, "/tmp/test");

      expect(result.success).toBe(true);
      expect(result.filesCreated).toHaveLength(5);
    });

    it("should not overwrite files when overwrite is false", async () => {
      mockFs.existsSync.mockImplementation((path) => {
        return path.toString().includes("index.tsx");
      });

      const result = await scaffoldComponent(mockOptions, "/tmp/test");

      expect(result.success).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toContain(
        "already exists and overwrite is disabled"
      );
    });
  });
});
