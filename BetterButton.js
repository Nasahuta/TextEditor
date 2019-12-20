import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class BetterButton extends React.Component {
    buttonTextStyle = () => {

        if (this.props.title == "U") {
            return [styles.title, styles.underlinetext]
        }

        if (this.props.title == "B") {
            return [styles.title, styles.boldtext]
        }

        if (this.props.title == "I") {
            return [styles.title, styles.italictext]
        }

        return styles.title;
    };

    render() {
        const { title, onPress } = this.props;

        return (
            <TouchableOpacity style={styles.button} onPress={() => onPress()}>
                <Text style={this.buttonTextStyle()}>{title}</Text>
            </TouchableOpacity>
        )
    };
}

BetterButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
    },

    button: {
        paddingHorizontal: 5,
        paddingVertical:5,
        borderRadius:3,
        width: 50,
        backgroundColor: '#ADD8E6',
    },

    boldtext: {
        fontWeight: "bold",
    },
    
    italictext: {
        fontStyle: "italic",
    },
    
    underlinetext: {
        textDecorationLine: "underline",
    },
});