/// <reference types= "cypress" />

describe("API testing", () => {
  let RandomIsbn = Math.floor(Math.random() * 23212);
  let RandomAisle = Math.floor(Math.random() * 23182);
  let Name = [
    "John Smith",
    "Alice Johnson",
    "Bob Brown",
    "Eva Lee",
    "Michael Davis",
    "Olivia Garcia",
    "Daniel Wilson",
    "Sophia Anderson",
    "William Martinez",
    "Ava Taylor",
    "James Miller",
    "Emma Jackson",
    "David White",
    "Isabella Harris",
    "Joseph Thompson",
    "Mia Moore",
    "Christopher Clark",
    "Madison Young",
    "Matthew Turner",
    "Grace Wright",
  ];
  let Books = [
    "Whispers of the Abyss",
    "Eternal Shadows",
    "The Forgotten Kingdom",
    "Serpents and Scepters",
    "Echoes of Eternity",
    "The Last Enchantment",
    "Ghosts of the Past",
    "Astral Echoes",
    "The Clockwork Conspiracy",
    "Crimson Horizons",
    "The Enigma Chronicles",
    "Chasing the Stars",
    "Beyond the Veil",
    "Realm of Shadows",
    "The Celestial Nexus",
    "Crown of Thorns",
    "The Labyrinth of Dreams",
    "Lost in the Echo",
    "Harmony of the Spheres",
    "The Quantum Paradox",
  ];

  let RandomName= Name[Math.floor(Math.random() * Name.length)]
  let RandomBook= Books[Math.floor(Math.random() * Books.length)]

  let requestBody = {
    name: RandomBook,
    isbn: RandomIsbn,
    aisle: RandomAisle,
    author: RandomName,
  };
  let deleteBody = {
    ID: `${RandomIsbn}${RandomAisle}`,
  };

  it("post request", () => {
    cy.log(RandomIsbn);
    cy.log(RandomAisle);
    cy.request({
      Method: "POST",
      url: "https://rahulshettyacademy.com/Library/Addbook.php",
      body: requestBody,
    }).then((response) => {
      cy.log(response.body.Msg);
      expect(response.status).to.eq(200);
      expect(response.body.Msg).to.eq("successfully added");
    });
  });
  it("Test Get Request", () => {
    cy.request({
      Method: "GET",
      url: `https://rahulshettyacademy.com/Library/GetBook.php?ID=${RandomIsbn}${RandomAisle}`,
    }).then((response) => {
      cy.log(response.body[0].author);
      cy.log(response.body[0].name);
      const firstletter = RandomName.charAt[0]
      const lastLetter = RandomName.charAt[RandomName.length-1]
      cy.log(`${firstletter}`)
      cy.log(`${lastLetter}`)

      expect(response.status).to.eq(200);
    });
  });
  it("Test Delete Request", () => {
    cy.request({
      Method: "DELETE",
      url: "https://rahulshettyacademy.com/Library/DeleteBook.php",
      body: deleteBody,
    }).then((response) => {
      cy.log(response.body);
      expect(response.status).to.eq(200);
      expect(response.body.msg).to.eq("book is successfully deleted");
    });
  });
});
