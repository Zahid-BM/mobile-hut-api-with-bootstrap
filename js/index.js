const searchPhone = () => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${input.value}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.data));
}
