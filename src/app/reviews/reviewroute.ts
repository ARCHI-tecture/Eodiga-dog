export const reviewRoute = async () => {
    const response = await fetch('/api/map')
      .then((resp)=>resp.json())
      console.log("리뷰를 어떻게 축출할것인가",response.reviews);
    return response.reviews
  };
