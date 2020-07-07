import React,{useState} from 'react';
import {View,Image,StyleSheet,Alert,ScrollView} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container, Header, Content, Item, Input, Icon,Button,Text } from 'native-base';
import CouponBox from '../../components/CouponBox'
export default function CouponScreen({navigation}) {
    const { t } = useTranslation();
    const [selected , setSelected] = useState('comming');

    return (
        <Container>
            <Content>


                <View style={styles.container}>



                    <View style={styles.components}>
                        <CouponBox
                            percent="40%"
                            image="https://docs.nativebase.io/docs/assets/web-cover1.jpg"
                        />
                        <CouponBox
                            percent="40%"
                            image="https://docs.nativebase.io/docs/assets/web-cover1.jpg"
                        /><CouponBox
                        percent="40%"
                        image="https://docs.nativebase.io/docs/assets/web-cover1.jpg"
                    />
                        <CouponBox
                        percent="40%"
                        image="https://docs.nativebase.io/docs/assets/web-cover1.jpg"
                    />

                    </View>
                </View>
            </Content>

        </Container>


    );
}
const styles = StyleSheet.create({

    container: {
        backgroundColor:'#FFFFFF',
        borderRadius:40,
        marginTop:'10%',
        textAlign:'center',
        alignItems:'center'
    },
    searchInput:{
        width:'90%',
        borderRadius:10,
        backgroundColor:'#F5F5F5',
        marginTop:35,
        alignItems:'center',
        paddingHorizontal:30,
        color:'#CECDCD',
        borderColor:'#F5F5F5',
        height:45,
        fontFamily:'Poppins-Medium',
        fontSize:4
    },
    buttons:{
        flexDirection:'row',
        marginVertical:20,
    },
    selectedButton: {
        backgroundColor: '#E50000',
        flex: .4,
        alignItems:'center',
        borderRadius:50,
        marginHorizontal:5,

        justifyContent:'center',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#E50000',
        shadowOffset: { height: 0, width: 0 },

    },
    button:{
        backgroundColor: '#FFFFFF',
        color: '#ffffff',
        flex: .4,
        marginHorizontal:5,
        borderColor:'#fff',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },


    },
    components:{
        width:'90%'
    }
});

