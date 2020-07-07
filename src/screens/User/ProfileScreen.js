import React,{useState} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container, Header, Content, Item, Input, Icon,Button,Text,Label } from 'native-base';
import StoreBox from '../../components/StoreBox'
export default function ProfileScreen({navigation}) {
    const { t } = useTranslation();

    return (
            <Container>
                <Content>

            <View style={{  alignItems: 'center'}}>
            <Image
                style={styles.stretch}
                source={require('../../Assets/Images/Group207.png')}
            />

        </View>

            <View style={styles.container}>
                <Text style={{        fontFamily:'Poppins-Medium',
                    fontSize:12,
                    padding:10,
                    textAlign:'center'

                }}>{t('Name')}</Text>
                <Item style={styles.searchInput} rounded >

                    <Input placeholder='Name' style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                    />
                </Item>

                <Text style={{        fontFamily:'Poppins-Medium',
                    fontSize:12,
                    padding:10,
                    textAlign:'center'
                }}>{t('Email')}</Text>
                <Item style={styles.searchInput} rounded >

                    <Input placeholder='Email' style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                    />
                </Item>

                <Text style={{        fontFamily:'Poppins-Medium',
                    fontSize:12,
                    padding:10,
                    textAlign:'center'
                }}>{t('Password')}</Text>
                <Item style={styles.searchInput} rounded >

                    <Input placeholder='Password' style={{textAlign:'center'}}  fontFamily='Poppins-ExtraLight' fontSize={15}  placeholderTextColor="#CECDCD"
                    />
                </Item>






            </View>
                    <View style={{alignItems:'center',padding:20}}>
                    <Button
                        title="Press me"
                        onPress={() => alert('a')}
                        style={ styles.selectedButton }
                    >
                        <Text style={{color:'#fff' ,fontFamily:'Poppins-medium',textAlign:'center',fontSize:15}}>{t('Save')}</Text>

                    </Button>
                    </View>
                </Content>

            </Container>


    );
}
const styles = StyleSheet.create({

    container: {
        borderRadius:40,
        textAlign:'left',
        alignItems:'center',
        alignSelf:'center'
    },
    searchInput:{
        width:'90%',
        borderRadius:10,
        backgroundColor:'#F5F5F5',
        alignItems:'center',
        paddingHorizontal:30,
        color:'#CECDCD',
        borderColor:'#F5F5F5',
        height:45,
        fontFamily:'Poppins-Medium',
        fontSize:4,
        textAlign:'center'
    },
    buttons:{
        flexDirection:'row',
        marginVertical:20,
    },
    selectedButton: {
        backgroundColor: '#E50000',
        alignItems:'center',
        justifyContent:'center',
        width:'70%',
        borderRadius:50,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

    },

    components:{
        width:'90%'
    },
    stretch:{
        resizeMode: 'stretch',


    }
});

