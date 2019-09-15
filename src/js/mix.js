export default function(mixObj) {
  return function(bodyObj) {
    return Object.assign(bodyObj, mixObj);
  };
}
