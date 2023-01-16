const handler = async (req, res) => {
  res.setHeader("Content-Type", "text/xml");
  res.write(createSitemap(pages));
  res.end();
};
const YOUR_SITENAME = process.env.NEXT_PUBLIC_DOMAIN_NAME;
const pages = [
  {
    slug: "/fav",
  },
  {
    slug: "/perfume-men",
  },
  {
    slug: "/perfume-women",
  },
  {
    slug: "/search",
  },
];

const createSitemap = (projects) => `<?xml version="1.0" encoding="UTF-8"?>
        <urlset
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
          http://www.w3.org/1999/xhtml http://www.w3.org/2002/08/xhtml/xhtml1-strict.xsd"
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xhtml="http://www.w3.org/1999/xhtml"
   
         >
          ${projects
            .map(({ slug }) => {
              return `
                      <url>
                          <loc>${`${YOUR_SITENAME}${slug}`}</loc>
                       
                       
  
  
                      </url>
                  `;
            })
            .join("")}
      </urlset>
      `;
export default handler;
