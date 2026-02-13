import { log } from "@portfolio/logger";

import { createServer } from "@api/server";

const port = process.env.PORT || 5001;
const server = createServer();

server.listen(port, () => {
  log(`api running on ${port}`);
});
