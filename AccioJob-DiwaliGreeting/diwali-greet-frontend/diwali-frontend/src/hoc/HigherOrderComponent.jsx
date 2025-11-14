function HOC(WrapperComponent) {
  return function InnerComponent() {
    return (
      <>
        <header>Header</header>
        {<WrapperComponent />}
        <footer>Footer</footer>
      </>
    );
  };
}
export default HOC;
