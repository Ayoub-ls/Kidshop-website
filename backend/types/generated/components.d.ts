import type { Schema, Struct } from '@strapi/strapi';

export interface CartCartCartItem extends Struct.ComponentSchema {
  collectionName: 'components_cart_cart_cart_items';
  info: {
    displayName: 'cart-item';
  };
  attributes: {
    imageSnapshot: Schema.Attribute.String;
    priceSnapshot: Schema.Attribute.Decimal;
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    quantity: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    size: Schema.Attribute.String;
    titleSnapshot: Schema.Attribute.String;
  };
}

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
      'cart.cart-cart-item': CartCartCartItem;
      'product-attr.categorys': ProductAttrCategorys;
      'product-attr.sizes': ProductAttrSizes;
    }
  }
}
