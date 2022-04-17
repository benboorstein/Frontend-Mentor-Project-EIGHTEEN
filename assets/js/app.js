let app = Vue.createApp({
    data() {
        return {
            billInputVal: '',
            buttonValues: [ '5%', '10%', '15%', '25%', '50%' ],
            customTipInputVal: 'Custom',
            noZeroAlert: '',
            numOfPeopleInputVal: '1',
            tipPerPersonStr: '0.00',
            totalPerPersonStr: '0.00'
        }
    },
    methods: {
        // keeping the input value to no more than two places past the decimal point
        formatBillInputVal() {
            if (this.billInputVal.indexOf('.') === this.billInputVal.length - 4 && this.billInputVal.length > 3) {
                this.billInputVal = this.billInputVal.slice(0, this.billInputVal.length - 1)
            }
        },
        // upon click of any 'buttonValue' input, converting 'buttonValue' value to decimal and updating text content of '.each-person-owes' section accordingly
        getDecimalAndSetText(event) {
            let tipAsDecimalNum
            event.target.value.length === 2 ? tipAsDecimalNum = +(`.0${event.target.value.slice(0, 1)}`) : tipAsDecimalNum = +(`.${event.target.value.slice(0, 2)}`)

            this.tipPerPersonStr = (+this.billInputVal * tipAsDecimalNum / +this.numOfPeopleInputVal).toFixed(2)
            this.totalPerPersonStr = ((+this.billInputVal * tipAsDecimalNum / +this.numOfPeopleInputVal) + (+this.billInputVal / +this.numOfPeopleInputVal)).toFixed(2)
        },
        // clearing content of 'customTipInputVal' input upon clicking inside it
        onFocus() {
            this.customTipInputVal = ''
        },
        // keeping 'customTipInputVal' input value to no more than three places, not allowing '%' to be entered into 'customTipInputVal' input, and not allowing '.' to be entered into 'customTipInputVal' input
        formatCustomTipInputVal() {
            this.customTipInputVal.length > 3 ? this.customTipInputVal = this.customTipInputVal.slice(0, 3) : this.customTipInputVal
            this.customTipInputVal.includes('%') ? this.customTipInputVal = this.customTipInputVal.slice(0, this.customTipInputVal.indexOf('%')) : this.customTipInputVal
            this.customTipInputVal.includes('.') ? this.customTipInputVal = this.customTipInputVal.slice(0, this.customTipInputVal.indexOf('.')) : this.customTipInputVal
        },
        // upon clicking out of '.tip-custom' input, updating text content of '.each-person-owes' section accordingly
        getDecNumAndSetText() {
            let customTipAsDecNum
            if (this.customTipInputVal.length === 1) {
                customTipAsDecNum = +(`.0${this.customTipInputVal}`) // e.g., 5 -> .05
            } else if (this.customTipInputVal.length === 2) {
                customTipAsDecNum = +(`.${this.customTipInputVal}`) // e.g., 25 -> .25
            } else {
                customTipAsDecNum = +(`${this.customTipInputVal.slice(0, 1)}.${this.customTipInputVal.slice(1)}`) // e.g., 100 -> 1.00
            }

            this.tipPerPersonStr = (+this.billInputVal * customTipAsDecNum / +this.numOfPeopleInputVal).toFixed(2)
            this.totalPerPersonStr = ((+this.billInputVal * customTipAsDecNum / +this.numOfPeopleInputVal) + (+this.billInputVal / +this.numOfPeopleInputVal)).toFixed(2)
        },
        // creating notification if user enters '0' or '' into '#num-of-people' input
        renderNoZeroAlert() {
            +this.numOfPeopleInputVal === 0 ? this.noZeroAlert = `Can't be zero ` : this.noZeroAlert = ''
        },
        reset() {
            this.tipPerPersonStr = '0.00'
            this.totalPerPersonStr = '0.00'
        }
    },
    /////////////////////////////////////////////////////
    mounted() {
        this.$refs.bill.focus() // DOESN'T work // // remember this depends on the 'bill' input's 'ref="bill"' (in the template) // https://michaelnthiessen.com/set-focus-on-input-vue
        console.log('mounted') // works
        console.log(this.$refs.bill) // works
    }
    /////////////////////////////////////////////////////
})

app.mount('#app')








// ///////////////////////////////////////////////
// window.onload = function() {
//     document.getElementById('bill').focus()
// }
// ///////////////////////////////////////////////