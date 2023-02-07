import { View, Text,TouchableOpacity,BackHandler, Alert } from 'react-native'
import React, { useEffect, useState,useCallback } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Commonstyles from '../utils/Styles'
import { TextInput } from 'react-native-gesture-handler'
import { CommonActions, useFocusEffect } from '@react-navigation/native'
import {useNavigation} from '@react-navigation/native'


import { saveData,register } from '../redux/action/RegisterAction'
import { showMessage } from 'react-native-flash-message'

const ProfileScreen = ({route}) => {
  const navigation = useNavigation()
  const dispatch = useDispatch() ;
  let userDetails = useSelector((store) => store?.register?.users)??[];

  console.log('userDetails', userDetails)

  const [userName, setUserName] =useState('');
    const [userEmail, setEmail] =useState('');
    const [userPassword, setPassword] =useState('');

    const [userValidError, setUserValidError] = useState('');
    const [emailValidError, setEmailValidError] = useState('');
    const [passwordValidError, setPasswordValidError] = useState('');

  let loginRes = route?.params?.loginRes??null;

  let userData =useSelector((store) => store?.register?.users)??[];
 let profileinfo = userData.find(e=> e.userEmail === loginRes?.userEmail)

  console.log('profile =', profileinfo)

  useFocusEffect (useCallback(
()=>{
    setUserName(profileinfo?.userName || '')
    setEmail(profileinfo?.userEmail || '')
    setPassword(profileinfo?.userPassword || '')
  },[]
  ) ) 


  const handleValidUserName = val => {
      if(!val){
        setUserValidError('Username must be enter');
      }else{
        setUserValidError('');
      }
    }



    const handleValidEmail = val => {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      
      if (val.length === 0) {
        setEmailValidError('email address must be enter');
      } else if (reg.test(val) === false) {
        setEmailValidError('enter valid email address');
      } else if (reg.test(val) === true) {
        setEmailValidError('');
      }
      };


      const handleValidPassword = val => {
        const uppercaseRegExp   = /(?=.*?[A-Z])/;
        const lowercaseRegExp   = /(?=.*?[a-z])/;
        const digitsRegExp      = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp   = /.{8,}/;
        const passwordLength =      val.length;
        const uppercasePassword =   uppercaseRegExp.test(val);
        const lowercasePassword =   lowercaseRegExp.test(val);
        const digitsPassword =      digitsRegExp.test(val);
        const specialCharPassword = specialCharRegExp.test(val);
        const minLengthPassword =   minLengthRegExp.test(val);
        let errMsg ="";
        if(passwordLength===0){
          setPasswordValidError("Password is empty");
        }else if(!uppercasePassword){
          setPasswordValidError("At least one Uppercase");
        }else if(!lowercasePassword){
          setPasswordValidError("At least one Lowercase");
        }else if(!digitsPassword){
          setPasswordValidError("At least one digit");
        }else if(!specialCharPassword){
          setPasswordValidError("At least one Special Characters");
        }else if(!minLengthPassword){
          setPasswordValidError("At least minumum 8 characters");
        }else{
          setPasswordValidError('');
        }
        // setPasswordErr(errMsg);
        };


 const update =()=>{
  if(userName && userEmail && userPassword && !userValidError &&!emailValidError && !passwordValidError){
    let existingUser= userDetails.some(e => e.userEmail === userEmail)

    if(!existingUser){
      console.log('preve =',userName,'=',userEmail,'=',userPassword)  

     const newArr = userDetails.map(obj => {
      if (obj.userId === profileinfo?.userId) {
        return {...obj, userName: userName, userEmail: userEmail, userPassword:userPassword };
      }
      return obj;
    });

    dispatch(register(newArr))
      showMessage({
        message: "Update Successfully",
        type: "info",
      });

     
      console.log('uid =',userData)  
    }else{
      showMessage({
        message: "User Already exists",
        type: "danger",
      });
    }
   
  }else{
      handleValidUserName(userName)
      handleValidEmail(userEmail)
      handleValidPassword(userPassword)
  }
  }


  const deleteUser =()=>{
    let index= userData.findIndex(e=>e.userId == profileinfo?.userId)
    userData.splice(index,1)
    console.log('indexof=',userData)

    showMessage({
      message: "User Deleted Sucessfully",
      type: "info",
    });

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'LoginScreen' },
        ],
      })
    );


  }
  
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);


  return (
    <View style={Commonstyles.container}>
      {/* <Text style={styles.font}>UserName : {loginRes?.userName}</Text>
      <Text style={styles.font}>UserEmail : {loginRes?.userEmail}</Text>
      <Text style={styles.font}>UserPassword : {loginRes?.userPassword}</Text> */}

      {/* <Text style={Commonstyles.font}>UserName : {profileinfo?.userName}</Text>
      <Text style={Commonstyles.font}>UserEmail : {profileinfo?.userEmail}</Text>
      <Text style={Commonstyles.font}>UserPassword : {profileinfo?.userPassword}</Text> */}

      {/*handle the view*/}
     <View >
      <TextInput  style={Commonstyles.InputBox}  value={userName} onChangeText={(userName)=> {setUserName(userName)}} ></TextInput>
      <TextInput  style={Commonstyles.InputBox}  value={userEmail} onChangeText={(userEmail)=> {setEmail(userEmail)}} ></TextInput>
      <TextInput  style={Commonstyles.InputBox}  value={userPassword} onChangeText={(userPassword)=> {setPassword(userPassword)}} ></TextInput>
      </View> 

      <TouchableOpacity style={Commonstyles.touchableBtn} onPress={()=>{update()}}>
        <Text  style={Commonstyles.btntxtFont}>Update</Text>   
      </TouchableOpacity>

      <TouchableOpacity style={Commonstyles.touchableBtn} onPress={()=>{deleteUser()}}>
      <Text  style={Commonstyles.btntxtFont}>Delete</Text>
      </TouchableOpacity>
     
    </View>
  )
}



export default ProfileScreen