export const reviewRoute = async () => {
    const response = await fetch('/api/map')
      .then((resp)=>resp.json())
    return response.reviews
  };

