import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Interes from "../Components/ButtonInteres";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const [data, setData] =useState( [] );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.100.92:3000/api/intereses');
        const data1 = await response.json();
        setData(data1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View className="flex-1 container bg-purple-400" >
      {/**Contiene toda la informacion del usuario como nombre y usuario */}
      <SafeAreaView className="flex ">
        <View className="flex-col  justify-start items-center mb-14 ">
          
          <Text className="text-black text-4xl mt-5"> Luis Ocegueda</Text>
          <Text className="text-2xl">@LuisOce</Text>
        </View>
      </SafeAreaView>

        {/**Esta view contiene los intereses y los botones */}
      <View
        className="flex-1 bg-neutral-100 px-2 pt-5 mx-auto container "
        style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }}
      >
        {/**Este es el componente para mostrar los botones con los interes  */}
        <Text className="text-2xl text-center ">Intereses</Text>
        <ScrollView>
        <View className=" flex-row flex-wrap  ">
         {data.map((item) => (
          <View key={item.id}><Interes id={item.id} interes={item.interes} /></View>
        ))}
        </View>
        </ScrollView>
          {/**Este view contiene los botones de cerrar sesion y cambiar interes */}
        
        <TouchableOpacity className="bg-orange-500 mx-7  p-3 rounded-xl ">
          <Text className="font-semibold text-center text-black text-base ">
            Cambiar Intereses
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-orange-500  p-3 rounded-xl mt-3 mx-7 mb-4"
          onPress={() => console.log("Biens")}
        >
          <Text className="font-semibold text-center text-black text-base">
            Cerrar sesion
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}
