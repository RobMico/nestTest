import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function start() {
    const PORT = process.env.PORT||5000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
    .setTitle('test proj')
    .setVersion('1.0.0')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, ()=>{console.log(`App started on ${PORT}`)});
};


//drop db - select 'drop table if exists "' || tablename || '" cascade;' FROM pg_tables where schemaname = 'public';
start();