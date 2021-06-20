import React from "react"
import {View, Text, TouchableOpacity, StyleSheet, Image} from "react-native"
import * as Permissions from "expo-permissions"
import {BarCodeScanner} from "expo-barcode-scanner"

export default class ScanScreen extends React.Component{
    constructor(){
        super()
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:"normal"
        }
    }

getCameraPermissions= async ()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermissions:status==="granted",
      buttonState:"clicked",
      scanned:false
    })
    }
    
    handleBarCodeScan= async ({type, data})=>{
      this.setState({
        scanned:true,
        scannedData:data,
        buttonState:"unclicked"
      })
    }

    render(){

    if (this.state.buttonState==="clicked"&&this.state.hasCameraPermissions){
return(
    <BarCodeScanner style={StyleSheet.absoluteFillObject}
    onBarCodeScanned={this.state.scanned===false? undefined :this.handleBarCodeScan}
    />
)
    }
    else if(this.state.buttonState==="unclicked"){
        return(
            <View>
            <View>
            <Text style={styles.Title}>Scanner</Text>
            <Image source={require("../Scanner.jpg")}
            style={{width:200, height:155, alignSelf:"center"}}
            />
            </View>
            <View>
<TouchableOpacity style={styles.ScanButton}
onPress={()=>{
  this.getCameraPermissions()
}}>
<Text> Scan </Text>
</TouchableOpacity>
    </View>
            </View>
        )
    }
}
    }
    const styles=StyleSheet.create({
        ScanButton:{
        width:50,
        height:30,
        backgroundColor:"lightblue",
        textAlign:"Center",
        justifyContent:"Center",
        alignSelf:"Center",
        marginTop:10,
        borderWidth:2,
        borderLeftWidth:0
        },
        Title:{
        fontSize:30,
        textAlign:"Center",
        justifyContent:"Center",
        alignSelf:"Center",
        }
    })