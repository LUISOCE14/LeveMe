import { View, Text, TouchableOpacity, Pressable,StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';


function CheckMark({ id,completed , toggleTodo}){
   function toggle(){
    toggleTodo(id)
    
   }
    return(
      <View>
      {completed ? (
       <TouchableOpacity style={styles.CheckMark} onPress={toggle}><AntDesign name="check" size={30} color="black" /></TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.uncheckedBox} onPress={toggle}></TouchableOpacity>
      )}
    </View>

    );


};

export default function Task({
    id,
    title,
    description,
    completed,
    toggleTodo
}){
    return(
        <View className="flex flex-row  rounded-md bg-gray-300 p-4 mt-4 items-center shadow-inner">
            <View className=" w-72 justify-start items-start" ><Text className=" text-center text-lg  ">{title}</Text></View>
            <CheckMark  id={id} completed={completed} toggleTodo={toggleTodo} />
        </View>
    );
};

const styles = StyleSheet.create({

      CheckMark:{
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f97316',
        borderRadius: 10
      },
      uncheckedBox: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10
      },
      
  });





