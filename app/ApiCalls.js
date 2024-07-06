const submitData=async(endPoint,method,data)=>{
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_KEY+endPoint, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        return res
    }catch(err){
    console.log(err)
    }
  }
  
  const getData = async (endPoint) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_KEY + endPoint,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      return res
    }catch(err){
        console.log(err)
    }
  }

export {getData,submitData}