const User = require('../models/User')
const FavoriteProduct = require('../models/FavoriteProduct')
const axios = require("axios");
const qs = require("qs");
const Hero = require('@ulixee/hero-playground');
const crypto = require("crypto");

module.exports.saveProduct = async (req, res) => {
    try {
        await FavoriteProduct.create({ sku: req.body.sku, imageUrl: req.body.imageUrl, productName: req.body.productName, user: req.user.id })

        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
}
module.exports.getStockXProduct = async (req, res) => {
    
    try {
        const user = await User.findOne({ _id: req.user.id }).lean();

       const productId = await getProductId(req.query.sku);

       const productData = await getProductData(productId);

       const variants = productData.variants
       const productImageUrl = productData.media.imageUrl
             

    //    return res.json({
    //     sku: req.query.sku,
    //     productId,
    //     productData,
    //     productImageUrl
    //     })

        return res.render('product', ({
            name: user.name,
            sku:req.query.sku,
            productId,
            productData,
            variants,
            productImageUrl
        }))
  

    } catch (error) {
        console.error(error);
        return res.render('error');
    }
}


const STOCKX_SEARCH_URL = "https://stockx.com/api/browse";

async function getProductId(sku) {

    const response = await axios(STOCKX_SEARCH_URL, {
        method: "GET",
        headers: {
            'accept': 'application/json',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
            'accept-encoding': 'gzip, deflate',
            'accept-language': 'en-US,en;q=0.9',
            'app-platform': 'Iron',
            'referer': 'https://stockx.com/sneakers',
            'app-version': '2022.07.31.04',
            'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest'
        },
        params: {
            "_search": sku,
            "page": 1,
            "resultsPerPage": 10,
            "dataType": "product",
            "facetsToRetrieve": ["browseVerticals"],
            "propsToRetrieve": ["brand", "colorway", "media.thumbUrl", "title", "productCategory", "shortDescription", "urlKey"]
        },
        paramsSerializer: params => {
            return qs.stringify(params)
        },
    });

    const data = await response.data;

    return data.Products[0].urlKey;
}

const STOCKX_API_URL = "https://stockx.com/api/p/e";

async function getProductData(productId) {

    const response = await axios(STOCKX_API_URL, {
        method: "POST",
        headers: {
            'accept': '*/*',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
            'accept-encoding': 'gzip, deflate',
            'accept-language': 'en-US,en;q=0.9',
            'apollographql-client-name': 'Iron',
            'apollographql-client-version': '0000.00.00.00',
            'referer': 'https://stockx.com/' + productId,
            'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'selected-country': 'US',
            'x-requested-with': 'XMLHttpRequest',
            'x-stockx-device-id': crypto.randomUUID()
        },
        data: {
            operationName: `GetProduct`,
            query: `query GetProduct($id: String!, $currencyCode: CurrencyCode, $countryCode: String!, $marketName: String) {\n  product(id: $id) {\n    id\n    listingType\n    deleted\n    ...ProductMerchandisingFragment\n    ...AffirmCalloutFragment\n    ...BreadcrumbsFragment\n    ...BreadcrumbSchemaFragment\n    ...HazmatWarningFragment\n    ...HeaderFragment\n    ...NFTHeaderFragment\n    ...LastSaleFragment\n    ...UrgencyBadgeFragment\n    ...MarketActivityFragment\n    ...MediaFragment\n    ...MyPositionFragment\n    ...ProductDetailsFragment\n    ...ProductMetaTagsFragment\n    ...ProductSchemaFragment\n    ...ScreenTrackerFragment\n    ...SizeSelectorWrapperFragment\n    ...StatsForNerdsFragment\n    ...ThreeSixtyImageFragment\n    ...TrackingFragment\n    ...UtilityGroupFragment\n    __typename\n  }\n}\n\nfragment ProductMerchandisingFragment on Product {\n  id\n  merchandising {\n    title\n    subtitle\n    image {\n      alt\n      url\n      __typename\n    }\n    body\n    trackingEvent\n    link {\n      title\n      url\n      urlType\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment AffirmCalloutFragment on Product {\n  productCategory\n  urlKey\n  market(currencyCode: $currencyCode) {\n    bidAskData(country: $countryCode, market: $marketName) {\n      lowestAsk\n      __typename\n    }\n    __typename\n  }\n  variants {\n    id\n    market(currencyCode: $currencyCode) {\n      bidAskData(country: $countryCode, market: $marketName) {\n        lowestAsk\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment BreadcrumbsFragment on Product {\n  breadcrumbs {\n    name\n    url\n    level\n    __typename\n  }\n  __typename\n}\n\nfragment BreadcrumbSchemaFragment on Product {\n  breadcrumbs {\n    name\n    url\n    __typename\n  }\n  __typename\n}\n\nfragment HazmatWarningFragment on Product {\n  id\n  hazardousMaterial {\n    lithiumIonBucket\n    __typename\n  }\n  __typename\n}\n\nfragment HeaderFragment on Product {\n  primaryTitle\n  secondaryTitle\n  condition\n  productCategory\n  __typename\n}\n\nfragment NFTHeaderFragment on Product {\n  primaryTitle\n  secondaryTitle\n  productCategory\n  editionType\n  __typename\n}\n\nfragment LastSaleFragment on Product {\n  id\n  market(currencyCode: $currencyCode) {\n    ...LastSaleMarket\n    __typename\n  }\n  variants {\n    id\n    market(currencyCode: $currencyCode) {\n      ...LastSaleMarket\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment LastSaleMarket on Market {\n  salesInformation {\n    annualHigh\n    annualLow\n    volatility\n    pricePremium\n    lastSale\n    changeValue\n    changePercentage\n    __typename\n  }\n  __typename\n}\n\nfragment UrgencyBadgeFragment on Product {\n  id\n  productCategory\n  primaryCategory\n  sizeDescriptor\n  listingType\n  market(currencyCode: $currencyCode) {\n    ...LowInventoryBannerMarket\n    __typename\n  }\n  variants {\n    id\n    market(currencyCode: $currencyCode) {\n      ...LowInventoryBannerMarket\n      __typename\n    }\n    __typename\n  }\n  traits {\n    name\n    value\n    visible\n    __typename\n  }\n  __typename\n}\n\nfragment LowInventoryBannerMarket on Market {\n  bidAskData(country: $countryCode, market: $marketName) {\n    numberOfAsks\n    lowestAsk\n    __typename\n  }\n  salesInformation {\n    lastSale\n    salesLast72Hours\n    __typename\n  }\n  __typename\n}\n\nfragment MarketActivityFragment on Product {\n  id\n  title\n  productCategory\n  primaryTitle\n  secondaryTitle\n  media {\n    smallImageUrl\n    __typename\n  }\n  __typename\n}\n\nfragment MediaFragment on Product {\n  id\n  productCategory\n  title\n  brand\n  urlKey\n  variants {\n    id\n    hidden\n    traits {\n      size\n      __typename\n    }\n    __typename\n  }\n  media {\n    gallery\n    all360Images\n    imageUrl\n    __typename\n  }\n  __typename\n}\n\nfragment MyPositionFragment on Product {\n  id\n  urlKey\n  __typename\n}\n\nfragment ProductDetailsFragment on Product {\n  id\n  title\n  productCategory\n  description\n  traits {\n    name\n    value\n    visible\n    format\n    __typename\n  }\n  __typename\n}\n\nfragment ProductMetaTagsFragment on Product {\n  id\n  urlKey\n  productCategory\n  brand\n  model\n  title\n  description\n  condition\n  styleId\n  breadcrumbs {\n    name\n    url\n    __typename\n  }\n  traits {\n    name\n    value\n    __typename\n  }\n  media {\n    thumbUrl\n    imageUrl\n    __typename\n  }\n  market(currencyCode: $currencyCode) {\n    bidAskData(country: $countryCode, market: $marketName) {\n      lowestAsk\n      numberOfAsks\n      __typename\n    }\n    __typename\n  }\n  variants {\n    id\n    hidden\n    traits {\n      size\n      __typename\n    }\n    market(currencyCode: $currencyCode) {\n      bidAskData(country: $countryCode, market: $marketName) {\n        lowestAsk\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ProductSchemaFragment on Product {\n  id\n  urlKey\n  productCategory\n  brand\n  model\n  title\n  description\n  condition\n  styleId\n  traits {\n    name\n    value\n    __typename\n  }\n  media {\n    thumbUrl\n    imageUrl\n    __typename\n  }\n  market(currencyCode: $currencyCode) {\n    bidAskData(country: $countryCode, market: $marketName) {\n      lowestAsk\n      numberOfAsks\n      __typename\n    }\n    __typename\n  }\n  variants {\n    id\n    hidden\n    traits {\n      size\n      __typename\n    }\n    market(currencyCode: $currencyCode) {\n      bidAskData(country: $countryCode, market: $marketName) {\n        lowestAsk\n        __typename\n      }\n      __typename\n    }\n    gtins {\n      type\n      identifier\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ScreenTrackerFragment on Product {\n  id\n  brand\n  productCategory\n  primaryCategory\n  title\n  market(currencyCode: $currencyCode) {\n    bidAskData(country: $countryCode, market: $marketName) {\n      highestBid\n      lowestAsk\n      numberOfAsks\n      numberOfBids\n      __typename\n    }\n    salesInformation {\n      lastSale\n      __typename\n    }\n    __typename\n  }\n  media {\n    imageUrl\n    __typename\n  }\n  traits {\n    name\n    value\n    __typename\n  }\n  variants {\n    id\n    traits {\n      size\n      __typename\n    }\n    market(currencyCode: $currencyCode) {\n      bidAskData(country: $countryCode, market: $marketName) {\n        highestBid\n        lowestAsk\n        numberOfAsks\n        numberOfBids\n        __typename\n      }\n      salesInformation {\n        lastSale\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment SizeSelectorWrapperFragment on Product {\n  id\n  ...SizeSelectorFragment\n  ...SizeSelectorHeaderFragment\n  ...SizesFragment\n  ...SizesOptionsFragment\n  ...SizeChartFragment\n  ...SizeChartContentFragment\n  ...SizeConversionFragment\n  ...SizesAllButtonFragment\n  __typename\n}\n\nfragment SizeSelectorFragment on Product {\n  id\n  title\n  productCategory\n  sizeDescriptor\n  availableSizeConversions {\n    name\n    type\n    __typename\n  }\n  defaultSizeConversion {\n    name\n    type\n    __typename\n  }\n  variants {\n    id\n    hidden\n    traits {\n      size\n      __typename\n    }\n    sizeChart {\n      baseSize\n      baseType\n      displayOptions {\n        size\n        type\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment SizeSelectorHeaderFragment on Product {\n  sizeDescriptor\n  productCategory\n  availableSizeConversions {\n    name\n    type\n    __typename\n  }\n  __typename\n}\n\nfragment SizesFragment on Product {\n  id\n  productCategory\n  listingType\n  title\n  __typename\n}\n\nfragment SizesOptionsFragment on Product {\n  id\n  listingType\n  variants {\n    id\n    hidden\n    group {\n      shortCode\n      __typename\n    }\n    traits {\n      size\n      __typename\n    }\n    sizeChart {\n      baseSize\n      baseType\n      displayOptions {\n        size\n        type\n        __typename\n      }\n      __typename\n    }\n    market(currencyCode: $currencyCode) {\n      bidAskData(country: $countryCode, market: $marketName) {\n        lowestAsk\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment SizeChartFragment on Product {\n  availableSizeConversions {\n    name\n    type\n    __typename\n  }\n  defaultSizeConversion {\n    name\n    type\n    __typename\n  }\n  __typename\n}\n\nfragment SizeChartContentFragment on Product {\n  availableSizeConversions {\n    name\n    type\n    __typename\n  }\n  defaultSizeConversion {\n    name\n    type\n    __typename\n  }\n  variants {\n    id\n    sizeChart {\n      baseSize\n      baseType\n      displayOptions {\n        size\n        type\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment SizeConversionFragment on Product {\n  productCategory\n  sizeDescriptor\n  availableSizeConversions {\n    name\n    type\n    __typename\n  }\n  defaultSizeConversion {\n    name\n    type\n    __typename\n  }\n  __typename\n}\n\nfragment SizesAllButtonFragment on Product {\n  id\n  sizeAllDescriptor\n  market(currencyCode: $currencyCode) {\n    bidAskData(country: $countryCode, market: $marketName) {\n      lowestAsk\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment StatsForNerdsFragment on Product {\n  id\n  title\n  productCategory\n  sizeDescriptor\n  urlKey\n  __typename\n}\n\nfragment ThreeSixtyImageFragment on Product {\n  id\n  title\n  variants {\n    id\n    __typename\n  }\n  productCategory\n  media {\n    all360Images\n    __typename\n  }\n  __typename\n}\n\nfragment TrackingFragment on Product {\n  id\n  productCategory\n  primaryCategory\n  brand\n  title\n  market(currencyCode: $currencyCode) {\n    bidAskData(country: $countryCode, market: $marketName) {\n      highestBid\n      lowestAsk\n      __typename\n    }\n    __typename\n  }\n  variants {\n    id\n    market(currencyCode: $currencyCode) {\n      bidAskData(country: $countryCode, market: $marketName) {\n        highestBid\n        lowestAsk\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment UtilityGroupFragment on Product {\n  id\n  ...FollowFragment\n  ...FollowContentFragment\n  ...FollowShareContentFragment\n  ...FollowSuccessFragment\n  ...PortfolioFragment\n  ...PortfolioContentFragment\n  ...ShareFragment\n  __typename\n}\n\nfragment FollowFragment on Product {\n  id\n  productCategory\n  title\n  followed\n  variants {\n    id\n    followed\n    traits {\n      size\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment FollowContentFragment on Product {\n  title\n  __typename\n}\n\nfragment FollowShareContentFragment on Product {\n  id\n  title\n  sizeDescriptor\n  urlKey\n  variants {\n    id\n    traits {\n      size\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment FollowSuccessFragment on Product {\n  id\n  title\n  productCategory\n  sizeDescriptor\n  media {\n    smallImageUrl\n    __typename\n  }\n  variants {\n    id\n    traits {\n      size\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment PortfolioFragment on Product {\n  id\n  title\n  productCategory\n  variants {\n    id\n    __typename\n  }\n  traits {\n    name\n    value\n    __typename\n  }\n  __typename\n}\n\nfragment PortfolioContentFragment on Product {\n  id\n  productCategory\n  sizeDescriptor\n  variants {\n    id\n    traits {\n      size\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ShareFragment on Product {\n  id\n  productCategory\n  title\n  media {\n    imageUrl\n    __typename\n  }\n  __typename\n}\n`,
            variables: {
                countryCode: "US",
                currencyCode: "USD",
                id: productId,
                marketName: "US"
            }
        },
    });

    const data = await response.data;
    const product = data.data.product;
    
    return product;

}

async function runGoatSearch (sku) {
    
    const GOAT_SEARCH_URL = `https://ac.cnstrc.com/search/${sku}`;

    const response = await axios(GOAT_SEARCH_URL, {
        method: "GET",
        headers: {
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9',
            'origin': 'https://www.goat.com',
            'sec-ch-ua': '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
        },
        params: {
            'c': 'ciojs-client-2.29.9',
            'key': 'key_XT7bjdbvjgECO5d8',
            'i': '6a6ab6e8-986d-45a0-bc1b-da443fa0133c',
            's': 30,
            'num_results_per_page': 25,
            '_dt' : Date.now()
        },
        paramsSerializer: params => {
            return qs.stringify(params)
        },
    });
    // response body
    const data = await response.data;
   
    const productData = data.response.results[0].data
    
    
    return {
        id: productData.id,
        slug: productData.slug,
        image: productData.image_url,
        name: data.response.results[0].value,
    };
};


async function getPageData (productLink) {
    const hero = new Hero();
    await hero.goto(productLink);
    const nextData = await hero.document.querySelector('#__NEXT_DATA__').textContent;
    const parsedData = JSON.parse(nextData);
    
    await hero.close();

    return parsedData;
}

module.exports.getGoatProduct = async (req, res) => {
    try {

        const productMetadata = await runGoatSearch(req.query.sku);

        const productLink = `https://www.goat.com/sneakers/${productMetadata.slug}`;

        const variantData = await getPageData(productLink);

        res.json({
            productMetadata,
            variantData,
        });

    } catch (err) {
        console.error(err);
        return res.render('error');
    }
}
