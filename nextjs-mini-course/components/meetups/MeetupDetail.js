function MeetupDetail(props) {
  return (
    <section className="text-center">
      <img className="w-full" src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}

export default MeetupDetail;
