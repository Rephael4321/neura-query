export default function List({ content }) {
  return (
    <ul>
      {content.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
