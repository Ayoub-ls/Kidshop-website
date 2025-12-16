import type { Schema, Struct } from '@strapi/strapi';

export interface ProductAttrCategorys extends Struct.ComponentSchema {
  collectionName: 'components_product_attr_categorys';
  info: {
    displayName: 'categorys';
  };
  attributes: {
    category: Schema.Attribute.String & Schema.Attribute.Unique;
  };
}

export interface ProductAttrSizes extends Struct.ComponentSchema {
  collectionName: 'components_product_attr_sizes';
  info: {
    displayName: 'sizes';
  };
  attributes: {
    size: Schema.Attribute.String & Schema.Attribute.Unique;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'product-attr.categorys': ProductAttrCategorys;
      'product-attr.sizes': ProductAttrSizes;
    }
  }
}
