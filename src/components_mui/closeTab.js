export const closeTab = () => {
    window.opener = null;
    window.open("", "_self");
    window.close();
  };
