import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native';

const Task = (props) => {

  const [task, setTask] = useState(props.text);
  const [edit,setEdit]=useState(false)

  const completeTask = (index) => {
    let itemsCopy = [...props.taskItems];
    console.log(itemsCopy)
    itemsCopy.splice(index,1);
    props.setTaskItems([...itemsCopy])
  }

  const editTask = (index) => {
    Keyboard.dismiss();
    let itemsCopy = [...props.taskItems];
    itemsCopy.splice(index, 1,task);
    props.setTaskItems(itemsCopy)
  }

  useEffect(()=>{
    setTask(props.text)
  },[props.text])

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        {!edit&&<Text style={styles.itemText}>{props.text}</Text>}
        {edit&&<TextInput style={styles.itemText}
          placeholder={'Write a task'} 
          value={task} 
          onChangeText={text => setTask(text)}
          // editable={edit}
        >
        </TextInput>}
      </View>
      {!edit&&<View style={styles.itemLeft}>
        <TouchableOpacity style={styles.textBox} onPress={()=>{setEdit(true)}}>
          <Text style={styles.itemText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.textBox,{width:30}]}  onPress={() => completeTask(props.index)}>
          <Text style={styles.itemText}>X</Text>
        </TouchableOpacity>
      </View>}
      {edit&&<TouchableOpacity style={[styles.textBox,{width:70}]}  onPress={() =>{setEdit(false);editTask(props.index)}}>
          <Text style={styles.itemText}>Save</Text>
        </TouchableOpacity>}
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width:'100%'
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '65%',
    // backgroundColor:'red'
  },
  textBox: {
    width: 60,
    height: 40,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
    padding:5,
    justifyContent:'center',
    alignItems:'center',
    margin:5,
  },
});

export default Task;