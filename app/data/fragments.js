export const MEDIA_FRAGMENT = `#graphql
  fragment Media on Media {
    __typename
    mediaContentType
    alt
    previewImage {
      url
    }
    ... on MediaImage {
      id
      image {
        url
        width
        height
      }
    }
    ... on Video {
      id
      sources {
        mimeType
        url
      }
    }
    ... on Model3d {
      id
      sources {
        mimeType
        url
      }
    }
    ... on ExternalVideo {
      id
      embedUrl
      host
    }
  }
`;

export const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment ProductCard on Product {
    id
    title
    publishedAt
    handle
    title_de_ch: metafield(namespace: "custom_fields", key: "title_de_ch") {
      value
     }
     title_fr: metafield(namespace: "custom_fields", key: "title_fr") {
      value
     }
     description_de_ch: metafield(namespace: "custom_fields", key: "description_de_ch") {
      value
     }
     description_fr: metafield(namespace: "custom_fields", key: "description_fr") {
      value
     }
    
    
    variants(first: 1) {
      nodes {
        id
        image {
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        selectedOptions {
          name
          value
        }
        product {
          handle
          title
          title_de_ch: metafield(namespace: "custom_fields", key: "title_de_ch") {
            value
           }
           title_fr: metafield(namespace: "custom_fields", key: "title_fr") {
            value
           }
           description_de_ch: metafield(namespace: "custom_fields", key: "description_de_ch") {
            value
           }
           description_fr: metafield(namespace: "custom_fields", key: "description_fr") {
            value
           }
        }
      }
    }
  }
`;
