const fs = require("fs");
const axios = require("axios");
const prettier = require("prettier");

const getDate = new Date().toISOString();
const fetchUrl = "https://priceay.herokuapp.com/api/products";

const YOUR_AWESOME_DOMAIN = "https://priceay.com";
const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });
const changefreq = "monthly";
const priority = 0.8;
(async () => {
  const fetchPosts = await axios(fetchUrl)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  const postList = [];
  fetchPosts.data.forEach((post) => postList.push(post.attributes.slug));

  const postListSitemap = `
      ${postList
        .map((product) => {
          return `
            <url>
              <loc>${`${YOUR_AWESOME_DOMAIN}/products/${product}`}</loc>
              <lastmod>${getDate}</lastmod>
              <changefreq>${changefreq}</changefreq>
              <priority>${priority}</priority>
            </url>`;
        })
        .join("")}
    `;

  const generatedSitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
      >
        ${postListSitemap}
      </urlset>
    `;

  const formattedSitemap = [formatted(generatedSitemap)];

  fs.writeFileSync(
    "./public/sitemap_products_en.xml",
    formattedSitemap.toString(),
    "utf8"
  );
})();
