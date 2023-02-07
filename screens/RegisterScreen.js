import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import {useNavigation} from '@react-navigation/native'

import { useSelector, useDispatch } from 'react-redux'
import { saveData,register } from '../redux/action/RegisterAction'
import { showMessage } from 'react-native-flash-message'



const RegisterScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch() ;
    let userDetails = useSelector((store) => store?.register?.users)??[];

  

    const [userName, setUserName] =useState('');
    const [userEmail, setEmail] =useState('');
    const [userPassword, setPassword] =useState('');

    const [userValidError, setUserValidError] = useState('');
    const [emailValidError, setEmailValidError] = useState('');
    const [passwordValidError, setPasswordValidError] = useState('');


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


          const onSubmit = ()=>{

            if(userName && userEmail && userPassword && !userValidError &&!emailValidError && !passwordValidError){
              let existingUser= userDetails.some(e => e.userEmail === userEmail)

              if(!existingUser){
                console.log('size',userDetails.length)

                var userId=userDetails.length;

                const userData ={userId,userName,userEmail,userPassword,}

                dispatch(register(userData))

                showMessage({
                  message: "Register Success",
                  type: "info",
                });

                navigation.navigate('LoginScreen')
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
               
                // setUserValidError(!userName?'UserName should be enter':'');
                // setEmailValidError(!userName?'Email should be enter':'');
                // setPasswordValidError(!userName?'Password should be enter':'');
            }
          }




  return (
    <View style={styles.container}>
        <TextInput placeholder='Username' onChangeText={(userName) =>{setUserName(userName); handleValidUserName(userName)}} value={userName}   autoCorrect={false}
          autoCapitalize="none" style={styles.InputBox}></TextInput>
       {userValidError ? <Text style={{color:'red'}}>{userValidError}  </Text>:null}

        <TextInput placeholder='Email' onChangeText={(userEmail) =>{setEmail(userEmail); handleValidEmail(userEmail)}} value={userEmail}   keyboardType="email-address" autoCorrect={false}
          autoCapitalize="none" style={styles.InputBox}></TextInput>
        {emailValidError ? <Text style={{color:'red'}}>{emailValidError}</Text> : null}

        <TextInput placeholder='Password' onChangeText={(userPassword) =>{setPassword(userPassword); handleValidPassword(userPassword)}} secureTextEntry={true}  autoCorrect={false}
          autoCapitalize="none" value={userPassword} style={styles.InputBox}></TextInput>
        {passwordValidError ? <Text style={{color:'red'}}>{passwordValidError}</Text> : null}

        <TouchableOpacity onPress={()=>{onSubmit()} } style={styles.btncolor}>
            <Text  style={styles.btntxtFont}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{navigation.navigate('LoginScreen')} } style={styles.btncolor}>
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

export default RegisterScreen