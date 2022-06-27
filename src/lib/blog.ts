export interface Post {
  url: string;
  frontmatter: Frontmatter;
}

interface Frontmatter {
  title: string;
  postDate: string;
  description: string;
}
