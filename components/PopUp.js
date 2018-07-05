import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PopupDialog, {
    DialogTitle,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
    FadeAnimation,
} from 'react-native-popup-dialog';


const scaleAnimation = new ScaleAnimation();


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialogContentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navigationBar: {
        borderBottomColor: '#b5b5b5',
        borderBottomWidth: 0.5,
        backgroundColor: '#ffffff',
    },
    navigationTitle: {
        padding: 10,
    },
    navigationButton: {
        padding: 10,
    },
    navigationLeftButton: {
        paddingLeft: 20,
        paddingRight: 40,
    },
    navigator: {
        flex: 1,
        // backgroundColor: '#000000',
    },
});

export default class App extends Component {
    state = {
        dialogShow: false,
    };

    showScaleAnimationDialog = () => {
        this.scaleAnimationDialog.show();
    }

    

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>

                    <DialogButton
                        text="Show Dialog - Scale Animation"
                        onPress={this.showScaleAnimationDialog}
                    />

                </View>

                <PopupDialog
                    ref={(popupDialog) => {
                        this.scaleAnimationDialog = popupDialog;
                    }}
                    dialogTitle={<DialogTitle title="Popup Dialog - Scale Animation" />}
                    actions={[
                        <DialogButton
                            text="DISMISS"
                            onPress={() => {
                                this.scaleAnimationDialog.dismiss();
                            }}
                            key="button-1"
                        />,
                    ]}
                >
                </PopupDialog>

                </View>
        );
    }
}