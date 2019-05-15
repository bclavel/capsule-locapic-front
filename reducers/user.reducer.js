export default function(userData = {}, action) {

  console.log('reducer action >>', action);

  if(action.type == 'signin') {

    var userCopy = {
      ...userData,
      firstName : action.firstName,
      lastName : action.lastName,
      email : action.email,
      facebookId : action.userId,
    };

      return userCopy;
  } else {
      return userData;
  }
}
