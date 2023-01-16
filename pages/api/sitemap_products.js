const handler = async (req, res) => {
  const url = `${process.env.NEXT_PUBLIC_API}/products?locale=ar&pagination[limit]=1000`;
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
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd"
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
 
       >
        ${projects
          .map(({ attributes }) => {
            return `
                    <url>
                        <loc>${`${YOUR_SITENAME}/products/${attributes.slug}`}</loc>
                        <lastmod>${attributes.updatedAt}</lastmod>
                     


                    </url>
                `;
          })
          .join("")}
    </urlset>
    `;
export default handler;
