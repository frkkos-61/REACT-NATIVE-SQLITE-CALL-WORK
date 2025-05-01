const convertFulName = (name, surname) => {
  return `${name} ${surname}`;
};

function getInitials(name, surname) {
  const nameInitial = name?.trim()[0]?.toUpperCase();
  const surnameInitial = surname?.trim()[0]?.toUpperCase();

  return nameInitial + surnameInitial;
}

export {convertFulName, getInitials};
