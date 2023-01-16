const handler = async (req, res) => {
  const url = `${process.env.NEXT_PUBLIC_API}/products?pagination[limit]=1000`;
  const resp = await fetch(url);

  const projects = await resp.json();
  console.log({ url });
  res.setHeader("Content-Type", "text/xml");
  res.write(createSitemap(projects.data));
  res.end();
};
const YOUR_SITENAME = process.env.NEXT_PUBLIC_DOMAIN_NAME;

const createSitemap = (projects) => `<?xml version="1.0" encoding="UTF-8"?>
      <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
      >
        ${projects
          .map(({ attributes }) => {
            return `
                    <url>
                        <loc>${`${YOUR_SITENAME}/en/products/${attributes.slug}`}</loc>
                       
                    </url>
                `;
          })
          .join("")}
    </urlset>
    `;
export default handler;
