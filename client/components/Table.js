export class SubmitDropzone extends React.Component {
  createTable() {
    const productItemList = productProductItemList.map(item => {
      return (
        <ProductItem
          title={item.title}
          link={item.link}
          description={item.description}
          img={item.img}
        />
      );
    });
    return;
  }
  render() {
    return this.createTable();
  }
}
