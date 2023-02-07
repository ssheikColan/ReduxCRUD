import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'

import {useNavigation} from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { saveData,register } from '../redux/action/RegisterAction'
import { showMessage } from 'react-native-flash-message'


const LoginScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch() ;

  const [userEmail, setEmail] =useState('');
  const [userPassword, setPassword] =useState('');

  const [emailValidError, setEmailValidError] = useState('');
  const [passwordValidError, setPasswordValidError] = useState('');


  let userData = useSelector((store) => store?.register?.users)??[];

    console.log('userdetails =',userData) 


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


        const onSubmit = ()=>{

          if( userEmail && userPassword  &&!emailValidError && !passwordValidError){
              
           let loginRes = userData.find(e =>e.userEmail === userEmail && e.userPassword === userPassword)

           console.log('loginres =' ,loginRes)

           if(loginRes){
            showMessage({
              message: "Login Success",
              type: "info",
            });
             //data pasing using props
            navigation.navigate('ProfileScreen',{loginRes : loginRes})
           }else{
            showMessage({
              message: "Invalid Credentials",
              type: 'danger',
            });
           }
             
              

           


          }else{
           
              handleValidEmail(userEmail)
              handleValidPassword(userPassword)
             
              // setUserValidError(!userName?'UserName should be enter':'');
              // setEmailValidError(!userName?'Email should be enter':'');
              // setPasswordValidError(!userName?'Password should be enter':'');
          }
        }

  return (
    <View style={styles.container}>
      <TextInput placeholder='Email' onChangeText={(userEmail) =>{setEmail(userEmail); handleValidEmail(userEmail)}} value={userEmail}   keyboardType="email-address" autoCorrect={false}
          autoCapitalize="none" style={styles.InputBox}></TextInput>
        {emailValidError ? <Text style={{color:'red'}}>{emailValidError}</Text> : null}

        <TextInput placeholder='Password' onChangeText={(userPassword) =>{setPassword(userPassword); handleValidPassword(userPassword)}} secureTextEntry={true}  autoCorrect={false}
          autoCapitalize="none" value={userPassword} style={styles.InputBox}></TextInput>
        {passwordValidError ? <Text style={{color:'red'}}>{passwordValidError}</Text> : null}

        <TouchableOpacity onPress={()=>{onSubmit()} } style={styles.btncolor}>
            <Text  style={styles.btntxtFont}>Login</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
      flex:1
  },
  InputBox:{
      borderWidth:2,
      borderColor:'gray',
      margin:11
  },
  btncolor:{
      backgroundColor:"blue",
     width:100,
      borderRadius: 5,
      margin:20,
      paddingVertical:10,
    },
    btntxtFont:{
      fontSize:15,
      color:"white",
      textAlign:"center"
    },
})

export default LoginScreen