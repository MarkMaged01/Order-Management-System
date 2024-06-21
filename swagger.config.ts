import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: any) {
  const options = new DocumentBuilder()
   .setTitle('Order Management System API')
   .setDescription('API documentation for the Order Management System')
   .setVersion('1.0')
   .addTag('orders')
   .addTag('products')
   .addTag('users')
   .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  
}
