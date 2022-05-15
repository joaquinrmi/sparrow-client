import React, { useState, useEffect } from "react";

import FormInput, { FormInputElement } from "../form_input/";

export interface Props
{
    id: string;
    className?: string;
    value?: Date;
}

const FULL_MONTHS = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

let Months: { [Prop: string]: number } = {};

let index = 0;
for(let month of FULL_MONTHS)
{
    Months[month] = index++;
}

const FULL_DAYS = [ ...new Array<number>(31) ].map((v, index) => `${index + 1}`);

const CURRENT_YEAR = Number(new Date().getFullYear());
const FULL_YEARS = [ ...new Array<number>(100) ].map((v, index) => `${CURRENT_YEAR - index}`);

export interface DateInputElement extends HTMLDivElement
{
    getYear(): number;
    getMonth(): number;
    getDay(): number;
}

const DateInput: React.FunctionComponent<Props> = (props) =>
{
    const [ months ] = useState([ ...FULL_MONTHS ]);
    const [ days, setDays ] = useState([ ...FULL_DAYS ]);
    const [ years ] = useState([ ...FULL_YEARS ]);

    useEffect(() =>
    {
        const yearInput = document.getElementById(`${props.id}-year`) as FormInputElement;
        const monthInput = document.getElementById(`${props.id}-month`) as FormInputElement;
        const dayInput = document.getElementById(`${props.id}-day`) as FormInputElement;

        const element = document.getElementById(props.id) as DateInputElement;

        element.getYear = () =>
        {
            return Number(yearInput.getValue());
        };

        element.getMonth = () =>
        {
            return Months[monthInput.getValue()];
        };

        element.getDay = () =>
        {
            return Number(dayInput.getValue());
        };

        const changeDayCount = () =>
        {
            let month = Months[monthInput.getValue()];
            let year = Number(yearInput.getValue());

            let dayCount = 0;

            if(month === FULL_MONTHS.length - 1)
            {
                dayCount = 31;
            }
            else
            {
                dayCount = new Date(year, month + 1, 0).getDate();
            }

            setDays(FULL_DAYS.slice(0, dayCount));
        };

        monthInput.addEventListener("change", () =>
        {
            changeDayCount();
        });

        yearInput.addEventListener("change", () =>
        {
            changeDayCount();
        });
    },
    []);

    let initYear = years[0];
    let initMonth = months[0];
    let initDay = days[0];

    if(props.value)
    {
        initYear = `${props.value.getFullYear()}`;
        initMonth = FULL_MONTHS[props.value.getMonth()];
        initDay = `${props.value.getDate()}`;
    }

    return <div id={props.id} className={props.className}>
        <FormInput id={`${props.id}-month`} title="Mes" options={months} value={initMonth} />
        <FormInput id={`${props.id}-day`} title="Día" options={days} value={initDay} />
        <FormInput id={`${props.id}-year`} title="Año" options={years} value={initYear} />
    </div>;
};

export default DateInput;