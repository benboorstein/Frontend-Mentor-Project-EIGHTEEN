let app = Vue.createApp({
    data() {
        return {
            billInputVal: '',
            tipButtonValues: [ '5%', '10%', '15%', '25%', '50%' ],
            customTipInputVal: 'Custom',
            tipAmount: 0,
            noZeroAlert: '',
            numOfPeopleInputVal: '1',
            tipPerPersonStr: '0.00',
            totalPerPersonStr: '0.00'
        }
    },
    methods: {
        // keep billInputVal to no more than two places past the decimal point
        formatBillInputVal() {
            if (this.billInputVal.indexOf('.') === this.billInputVal.length - 4 && this.billInputVal.length > 3) {
                this.billInputVal = this.billInputVal.slice(0, this.billInputVal.length - 1)
            }
        },
        // upon clicking out of #bill input (regardless of where user clicks), set totalPerPersonStr 
        setTotalPerPersonText() {
            this.totalPerPersonStr = (+this.billInputVal).toFixed(2)
        },
        // calculate tipAmount
        calcTipAmount(tipAsDecimalNum) { // tipAsDecimalNum is the alias for btnTipAsDecimalNum and customTipAsDecimalNum
            this.tipAmount = +this.billInputVal * tipAsDecimalNum
        },
        // calculate what each person owes and update tipPerPersonStr and totalPerPersonStr accordingly
        renderWhatEachPersonOwes() {
            this.tipPerPersonStr = (this.tipAmount / +this.numOfPeopleInputVal).toFixed(2)
            this.totalPerPersonStr = ((+this.billInputVal + this.tipAmount) / +this.numOfPeopleInputVal).toFixed(2)
        },
        // upon click of any tipButtonValue button, convert tipButtonValue to decimal and update tipPerPersonStr and totalPerPersonStr accordingly
        handleTipButtons(event) {
            let btnTipAsDecimalNum
            event.target.value.length === 2 ? btnTipAsDecimalNum = +(`.0${event.target.value.slice(0, 1)}`) : btnTipAsDecimalNum = +(`.${event.target.value.slice(0, 2)}`)

            this.calcTipAmount(btnTipAsDecimalNum)

            this.renderWhatEachPersonOwes()

            this.customTipInputVal = 'Custom'
        },
        // upon clicking inside .tip-custom, clear its content
        clearValOnFocus() {
            this.customTipInputVal = ''
        },
        // keep customTipInputVal to no more than three places, not allowing '%' or '.' to be entered into .tip-custom
        formatCustomTipInputVal() {
            this.customTipInputVal.length > 3 ? this.customTipInputVal = this.customTipInputVal.slice(0, 3) : this.customTipInputVal
            this.customTipInputVal.includes('%') ? this.customTipInputVal = this.customTipInputVal.slice(0, this.customTipInputVal.indexOf('%')) : this.customTipInputVal
            this.customTipInputVal.includes('.') ? this.customTipInputVal = this.customTipInputVal.slice(0, this.customTipInputVal.indexOf('.')) : this.customTipInputVal
        },
        // upon clicking out of .tip-custom, update tipPerPersonStr and totalPerPersonStr accordingly
        handleCustomTipInputVal() {
            let customTipAsDecimalNum
            if (this.customTipInputVal.length === 0) {
                this.customTipInputVal = 'Custom'
                customTipAsDecimalNum = 0
            } else if (this.customTipInputVal.length === 1) {
                customTipAsDecimalNum = +(`.0${this.customTipInputVal}`) // e.g., 5 -> .05
            } else if (this.customTipInputVal.length === 2) {
                customTipAsDecimalNum = +(`.${this.customTipInputVal}`) // e.g., 25 -> .25
            } else {
                customTipAsDecimalNum = +(`${this.customTipInputVal.slice(0, 1)}.${this.customTipInputVal.slice(1)}`) // e.g., 100 -> 1.00
            }

            this.calcTipAmount(customTipAsDecimalNum)

            this.renderWhatEachPersonOwes()
        },
        // create notification if '0' or '' is entered into #num-of-people
        renderNoZeroAlert() {
            +this.numOfPeopleInputVal === 0 ? this.noZeroAlert = `Can't be zero ` : this.noZeroAlert = ''
        },
        // upon click of .reset-btn, update tipPerPersonStr and totalPerPersonStr
        reset() {
            this.tipPerPersonStr = '0.00'
            this.totalPerPersonStr = '0.00'
        }
    },
    mounted() {
        this.$refs.bill.focus() // Note that when I put all my HTML and JS in CodePen (applying Vue in CodePen of course), this line works. It's not clear why it's not working here. Move on. // Remember that this line depends on the #bill input's 'ref="bill"' in the template. // Remember that I referenced https://michaelnthiessen.com/set-focus-on-input-vue to learn how to do this.
    }
})

app.mount('#app')


///////////////////////////////////////////////
// this is vanilla JS and shouldn't be here - it's just here because the functionality of 'this.$refs.bill.focus()' in 'mounted()' isn't working for this project as it should (see the note by that line)
window.onload = function() {
    document.getElementById('bill').focus()
}
///////////////////////////////////////////////