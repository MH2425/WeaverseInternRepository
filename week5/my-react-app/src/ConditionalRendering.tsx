function ConditionalRendering({name, isPacked} : {name:string, isPacked:boolean}) {
    let itemContent = name;
    if (isPacked) {
        itemContent = name + " ✅";
    }
    return (
        <li className="item">
            {itemContent}
        </li>
    );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <ConditionalRendering 
          isPacked={true} 
          name="Space suit" 
        />
        <ConditionalRendering 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <ConditionalRendering 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}