import { Fragment } from "react/jsx-runtime";

interface Person {
  id: number;
  name: string;
  profession: string;
  accomplishment: string;
  imageId: string;
}

const people: Person[] = [
  {
    id: 0,
    name: "Creola Katherine Johnson",
    profession: "mathematician",
    accomplishment: "spaceflight calculations",
    imageId: "MK3eW3A",
  },
  {
    id: 1,
    name: "Mario José Molina-Pasquel Henríquez",
    profession: "chemist",
    accomplishment: "discovery of Arctic ozone hole",
    imageId: "mynHUSa",
  },
  {
    id: 2,
    name: "Mohammad Abdus Salam",
    profession: "physicist",
    accomplishment: "electromagnetism theory",
    imageId: "bE7W1ji",
  },
  {
    id: 3,
    name: "Percy Lavon Julian",
    profession: "chemist",
    accomplishment: "pioneering cortisone drugs, steroids and birth control pills",
    imageId: "IOjWm71",
  },
  {
    id: 4,
    name: "Subrahmanyan Chandrasekhar",
    profession: "astrophysicist",
    accomplishment: "white dwarf star mass calculations",
    imageId: "lrWQx8l",
  },
];

function getImageUrl(person: Person) {
  return `https://i.imgur.com/${person.imageId}s.jpg`;
}

const chemists = people.filter((p) => p.profession === "chemist");
const everyoneElse = people.filter((p) => p.profession !== "chemist");

function ListSection({ title, people }: { title: string; people: Person[] }) {
  return (
    <Fragment>
      <h2>{title}</h2>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            <img src={getImageUrl(person)} alt={person.name} />
            <p>
              <b>{person.name}:</b> {person.profession} known for {person.accomplishment}
            </p>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default function ListRender() {
  return (
    <article>
      <h1>Scientists</h1>
      <ListSection title="Chemists" people={chemists} />
      <ListSection title="Everyone else" people={everyoneElse} />
    </article>
  );
}
