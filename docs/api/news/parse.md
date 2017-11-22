## News parse api

## parse url
```parse api
link : domain/api/parse,
parse topic filter: parse home from url get {title, description, doamin, logo, keywords, fbappid, categories, subcategories}
parse categoryitem: 
```


## Catelogry Filter
```filter need
containers: array
headers: array
articles: array

vnexpress
----------------------------------
Báo VnExpress

https://vnexpress.net

```

## Containers
```

{"category":{"listItem":"body section[class=container] section[class=sidebar_1] article[class=list_news]","data":{"title":{"selector":"h3[class=title_news] a","how":"x => x.text()"},"url":{"selector":"h3[class=title_news] a","attr":"href"},"comment":{"selector":"h3[class=title_news] a[class=icon_commend]","attr":"href"},"description":{"selector":"h4[class=description]","how":"x => x.text()"},"thumb_image":{"selector":"div[class=thumb_art] a img","data":{"src":{"attr":"src"},"original":{"attr":"data-original"},"description":{"attr":"alt"}}},"thumb_video":{"selector":"div[class=thumb_art] span[class=icon_thumb_videophoto]","attr":"href"},"related":{"selector":"p[class=related_news] a","data":{"title":{"attr":"title"},"url":{"attr":"href"}}}}}}

```



## Contents

```



"publisherTime": {
    "selector": "head meta[name=pubdate]",
    "attr": "content"
  },
  "title": {
    "selector": "head meta[property='og:title']",
    "attr": "content"
  },
  "description": {
    "selector": "head meta[property='og:description']",
    "attr": "content"
  },
  "keywords": {
    "selector": "head meta[name=keywords]",
    "attr": "content"
  },
  "thumb_image": {
    "selector": "head meta[itemprop=thumbnailUrl]",
    "attr": "content"
  },
  "url": {
    "selector": "head meta[itemprop=url]",
    "attr": "content"
  },



  ```


{"node":{"listItem":"body section[class=container] section[class=wrap_sidebar_12] section[class=sidebar_1] article > p, table","data":{"str":{"how":"x => x.text()"},"url":{"selector":"tbody tr td img","attr":"src"},"desc":{"selector":"tbody tr td p"}}}}