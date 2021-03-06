import React, { Component, useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView, Switch, Platform, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Color } from "../utils/Colors";
import {Lato_400Regular, Lato_100Thin, useFonts} from "@expo-google-fonts/lato";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function ProfileCard() {
    const [fontLoaded] = useFonts({ Lato_400Regular, Lato_100Thin});
    const [strike, setStrike] = useState(22);
    const [joinCount, setJoinCount] = useState(3);
    const [joinTime, setJoinTime] = useState(143);
    const [joinStrike, setJoinStrike] = useState(12);
    const [reminders, setReminders] = useState(false);
    const [remindHour, onChangeRemindHour] = useState(9);
    const [remindMinute, onChangeRemindMinute] = useState(40);
    const [appleHealth, setAppleHealth] = useState(false);
    const [remindDays, setRemindDays] = useState([
        {text: "P", open: false},
        {text: "S", open: false},
        {text: "Ç", open: true},
        {text: "P", open: false},
        {text: "C", open: false},
        {text: "C", open: false},
        {text: "P", open: true},
    ]);
    const [renderMe, setRenderMe] = useState(false);

    const InfoArea = ({ text, count }) => (
        <View style={{flex: 1}}>
            <Text style={styles.infoLabel}>{text}</Text>
            <Text style={styles.infoCount}>{count}</Text>
        </View>
    );

    const SocialIcon = ({source}) => (
        <TouchableOpacity
            onPress={()=>{

            }}
            style={{ paddingHorizontal: 15 }}
        >
            <Image style={styles.socialIcon} source={source} />

        </TouchableOpacity>
    )

    const SwitchArea = ({text, value, setValue}) => (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width : windowWidth * 9 / 10,
            marginBottom: 10
        }}>
            <Text style={styles.text}>{text}</Text>
            <Switch
                value={value}
                onValueChange={v => {
                    setValue(v);
                }}
            />
        </View>
    )

    const RemindersBar = ({days}) => (
        <View>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width : windowWidth * 9 / 10,
                marginTop: 10,
                marginBottom: 20,
            }}>
                {days.map((day, index) => (
                    <View style={styles.reminder} key={"reminder_day_"+index}>
                        <Text style={[styles.text, { paddingTop: 5, paddingBottom: 6 }]}>{day.text}</Text>
                        <TouchableWithoutFeedback
                            onPress={()=>{
                                days[index].open = !days[index].open;
                                setRenderMe(val => !val);
                            }}
                        >
                            <View style={[styles.reminderIcon, { backgroundColor: day.open ? "#32d74b" : "#000" }]}/>

                        </TouchableWithoutFeedback>
                    </View>
                ))}
            </View>
            <View style={{
                flexDirection: "row",
                marginTop: 10,
                marginBottom: 20,
                justifyContent: "center"
            }}>
                <Text style={[styles.text, { fontSize: 20 }]}>Saat </Text>
                <TextInput
                    style={[styles.text, { fontSize: 20 }]}
                    onChangeText={text => onChangeRemindHour(text)}
                    numeric={true}
                    keyboardType={'numeric'}
                    value={remindHour+""}
                />
                <Text style={[styles.text, { fontSize: 20 }]}> : </Text>
                <TextInput
                    style={[styles.text, { fontSize: 20 }]}
                    onChangeText={text => onChangeRemindMinute(text)}
                    value={remindMinute+""}
                    numeric={true}
                    keyboardType={'numeric'}
                />

            </View>
        </View>
    )

    return (
        <ScrollView contentContainerStyle={styles.container}>
           <View style={styles.profileArea}>
               <ImageBackground style={styles.strikeImage} source={require('../assets/images/rozet.png')}>
                   <Text style={styles.strikeText}>{strike}</Text>
               </ImageBackground>

               <View style={styles.infoArea}>
                   <InfoArea text="KATILDIĞI MEDiTASYONLAR" count={joinCount}/>
                   <InfoArea text="MEDiTASYONDAKi DAKiKALARIN" count={joinTime}/>
                   <InfoArea text="ART ARDA GÜNLERiN" count={joinStrike}/>
               </View>

               <View style={styles.shareArea}>
                   <Image  source={require("../assets/images/export.png")} />
                   <Text style={[styles.text, { paddingTop: 2, marginLeft: 5 }]}>İstatistiklerini Paylaş</Text>
               </View>
           </View>

            <View >
                <TouchableOpacity
                    style={{ marginVertical: 10 }}
                >
                    <Text style={styles.text}>Takvim ve Geçmiş > </Text>
                </TouchableOpacity>
                <SwitchArea text="Anımsatıcılar" value={reminders} setValue={setReminders}/>
                { reminders ? <RemindersBar days={remindDays} /> : null }

                { Platform.OS === "ios" ? <SwitchArea text="Apple Sağlık" value={appleHealth} setValue={setAppleHealth}/> : null }
                <TouchableOpacity
                    style={{ marginBottom: 10 }}
                >
                    <Text style={styles.text}>Sıkça Sorulan Sorular </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginBottom: 10 }}
                >
                    <Text style={styles.text}>Bize Ulaşın </Text>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.socialLabel}>Bizi Tavsiye Edin</Text>
                <View style={styles.socialIcons}>
                    <SocialIcon source={require("../assets/images/fbIcon.png")}/>
                    <SocialIcon source={require("../assets/images/instagramIcon.png")}/>
                    <SocialIcon source={require("../assets/images/twitterIcon.png")}/>
                    <SocialIcon source={require("../assets/images/whatsappIcon.png")}/>
                </View>
            </View>

        </ScrollView>
    )


};



const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        flexGrow: 1
    },
    profileArea: {
        alignItems: "center",
        marginTop: 60
    },
    shareArea: {
        borderColor: "#7A51B9",
        borderRadius: 25,
        borderWidth: 3,
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10
    },
    socialIcons: {
        flexDirection: "row",
        marginBottom: 10
    },
    text: {
        color: Color.LIGHT_TEXT_COLOR,
        fontSize: 18,
        fontFamily: "Lato_400Regular"
    },
    backGround:{
        backgroundColor: '#280d52'
    },
    strikeImage: {
        width: 200,
        height: 100,
        marginBottom: 10
    },
    strikeText: {
        color: Color.LIGHT_TEXT_COLOR,
        fontFamily: "Lato_400Regular",
        fontSize: 24,
        textAlign: "center",
        paddingTop: 18
    },
    infoArea :{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: windowWidth
    },
    infoLabel: {
        fontFamily: "Lato_400Regular",
        color: Color.LIGHT_TEXT_COLOR,
        opacity: 0.4,
        textAlign: "center",
        fontSize: 13
    },
    infoCount: {
        fontFamily: "Lato_400Regular",
        color: Color.LIGHT_TEXT_COLOR,
        textAlign: "center"
    },
    socialLabel: {
        fontFamily: "Lato_400Regular",
        color: Color.LIGHT_TEXT_COLOR,
        textAlign: "center",
        paddingVertical: 10
    },
    socialIcon: {
        width: 50,
        height: 50
    },
    reminder : {
        borderRadius: 12,
        backgroundColor: "#9E9E9E",
        width: 34,
        height: 54,
        alignItems: "center"
    },
    reminderIcon: {
        borderRadius: 50,
        width: 28,
        height: 28,
        marginTop: 0,
        borderColor: "#707070",
        borderWidth: 2
    }
});
