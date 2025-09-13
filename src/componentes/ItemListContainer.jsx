import "../App.css";

export default function ItemListContainer(props) {
  return (
    <section className="item-list-container">
      <h2>{props.mensaje}</h2>
      <p>Aquí próximamente verás nuestro catálogo de productos.</p>
    </section>
  );
}
