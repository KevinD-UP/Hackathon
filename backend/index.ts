import dotenv from 'dotenv';
dotenv.config();

import { container } from "./src/IoC/container";
import { InversifyExpressServer } from "inversify-express-utils";
import cors from "cors"
import bodyParser from "body-parser";
import './src/Presentation/AllControllers'

const port = process.env.PORT || 8000 ;

// create server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(cors())
    // add body parser
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});

let app = server.build();
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})