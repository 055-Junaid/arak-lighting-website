export const BLOG_THEME_KEY = "arak-blog-theme";
// Applied before paint. White is the default, regardless of the OS colour scheme.
export const BLOG_THEME_BOOT_SCRIPT = `(function(){try{if(localStorage.getItem("${BLOG_THEME_KEY}")==="dark"){document.documentElement.setAttribute("data-blog-theme","dark")}}catch(e){}})()`;
