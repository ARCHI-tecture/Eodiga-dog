export const bookmarkroute = async () => {
    const resp = await fetch('/api/map')
      .then((resp)=>resp.json())
    return resp.bookmarks
  };
