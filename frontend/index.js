const calcTime = (timestamp) => {
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (second > 0) return `${second}초 전`;
  else "방금 전";
};

const renderData = (data) => {
  const main = document.querySelector("main");
  data
    .sort((a, b) => a)
    .forEach(async (obj) => {
      const Div = document.createElement("div");
      Div.className = "item-list";

      const imageDiv = document.createElement("div");
      imageDiv.className = "item-list__img";

      const img = document.createElement("img");
      const res = await fetch(`/images/${obj.id}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      img.src = url;

      const InfoDiv = document.createElement("div");
      InfoDiv.className = "item-list__info";

      const InfoTitleDiv = document.createElement("div");
      InfoTitleDiv.className = "item-list__info-title";
      InfoTitleDiv.innerText = obj.title;

      const InfoMetaDiv = document.createElement("div");
      InfoMetaDiv.className = "item-list__info-meta";
      InfoMetaDiv.innerText = obj.place + " " + calcTime(obj.insertAt);

      const InfoPriceDiv = document.createElement("div");
      InfoPriceDiv.className = "item-list__info-price";
      InfoPriceDiv.innerText = obj.price;

      imageDiv.appendChild(img);
      InfoDiv.appendChild(InfoTitleDiv);
      InfoDiv.appendChild(InfoMetaDiv);
      InfoDiv.appendChild(InfoPriceDiv);
      Div.appendChild(imageDiv);
      Div.appendChild(InfoDiv);
      main.appendChild(Div);
    });
};

const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  renderData(data);
};

fetchList();
