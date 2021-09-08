"use strict";

const cardsContainer = document.querySelector("#root");

const userCards = data.map(function (userObj) {
  return generateUserCard(userObj);
});
cardsContainer.append(...userCards);

/**
 * Создает карточку на основании обьекта пользователя
 * @param {object} userObj обьект с даннывми пользователя
 * @returns {HTMLLIElement} верстка карточки
 */

function generateUserCard(userObj) {
  const {
    id,
    firstName,
    lastName,
    description = Math.random().toString(36).substring(2, 10),
    profilePicture,
    contacts,
  } = userObj;

  const img = createElement("img", {
    classNames: ["img"],
    attrs: {
      src: profilePicture,

      alt: firstName,
      "data-id": id,
    },
  });
  img.addEventListener("error", deleteHandler);
  img.addEventListener("load", imageLoadHandler);

  const userFirstName = createElement(
    "h2",
    { classNames: ["cardName"] },
    document.createTextNode(firstName)
  );
  const userLastName = createElement(
    "h2",
    { classNames: ["cardName"] },
    document.createTextNode(lastName)
  );
  const cardDescription = createElement(
    "p",
    {
      classNames: ["cardDescription"],
    },
    document.createTextNode(description)
  );

  const initails = createElement(
    "div",
    { classNames: ["initials"] },
    document.createTextNode(
      firstName

        .trim()
        .split(" ")
        .map((word) => word[0])
        .join(" ")
    ),
    document.createTextNode(
      lastName

        .trim()
        .split(" ")
        .map((word) => word[0])
        .join(" ")
    )
  );
  initails.style.backgroundColor = stringToColour(firstName, lastName);

  const imgWrapper = createElement(
    "div",
    {
      classNames: ["imgWrapper"],
      attrs: { id: `wrapper${id}`, title: [`${firstName} ${lastName}`] },
    },
    initails
  );

  const linkWrapper = createElement(
    "div",
    { classNames: ["linkWrapper"] },
    ...generateLinks(contacts)
  );
  const article = createElement(
    "article",
    { classNames: ["userCard"] },
    imgWrapper,
    userFirstName,
    userLastName,
    cardDescription,
    linkWrapper
  );

  const userCard = createElement(
    "li",
    { classNames: ["cardWrapper"] },
    article
  );

  return userCard;
}

/*
  UTILS
*/
/**
 * Функция генерации цвета для строки
 * @param {string} str
 * @returns {string} строка в виде хекс-кода (#FF3610)
 */
function stringToColour(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
}

function generateLinks(contacts) {
  const linksArray = contacts.map((contact) => {
    const url = new URL(contact);
    const hostname = url.hostname;

    if (SUPPORTED_SOCIAL_NETWORKS.has(hostname)) {
      const link = createElement("a", {
        classNames: SUPPORTED_SOCIAL_NETWORKS.get(hostname),
        attrs: { id: `a-class` },
      });
      link.setAttribute("href", url);
      return link;
    }
  });
  return linksArray;
}
