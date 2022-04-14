<template>
    <div class="tickets">
        <div class="tickets__wrapper">
            <div class="tickets__body">
                <div class="tickets__top">
                    <div class="tickets__statuses">
                        <div class="tickets__status">
                            <div
                                class="tickets__status-text tickets__status-text_active"
                            >
                                Невзятые({{ calculatesCountStatus('not-taken') }})
                            </div>
                        </div>
                        <div class="tickets__status">
                            <div class="tickets__status-text">Взятые({{ calculatesCountStatus('taken')}})</div>
                        </div>
                        <div class="tickets__status">
                            <div class="tickets__status-text">Закрытые({{ calculatesCountStatus('closed')}})</div>
                        </div>
                    </div>
                    <div class="tickets__search">
                        <div class="search">
                            <div class="search__box">
                                <input
                                    type="text"
                                    class="search__input"
                                    placeholder="Найти тикет..."
                                    @keyup="updatePaginate"
                                    v-model="searchFilter"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tickets__list">
                    <div class="ticket ticket_top">
                        <p class="ticket__number ticket__cell">№</p>
                        <p class="ticket__user ticket__cell">Пользователь</p>
                        <div class="ticket__date ticket__date_top ticket__cell">
                            <p class="ticket__date-text ticket__date-text_top">
                                Дата и время
                            </p>
                            <span class="ticket__date-ico"></span>
                        </div>
                        <p class="ticket__theme ticket__cell">Тема</p>
                        <p class="ticket__description-problem ticket__cell">
                            Описание проблемы
                        </p>
                    </div>

                    <div
                        class="ticket"
                        v-for="(ticket, index) in filteredMovies "
                        :key="index"
                        v-show="setPaginate(index)"
                    >
                            <p class="ticket__number ticket__cell">
                                #{{ index + 1 }}
                            </p>
                            <div class="ticket__user ticket__cell">
                                <img :src="getStaticUrl(ticket.user.avatar)" alt="" class="ticket__user-avatar">
                                <p class="ticket__user-name">
                                    {{ ticket.user.name }}
                                </p>
                            </div>
                            <div class="ticket__date ticket__cell">
                                <p class="ticket__date-text">
                                    {{ ticket.date.dateDate }}
                                </p>
                                <p class="ticket__date-time">
                                    {{ ticket.date.dateTime }}
                                </p>
                            </div>
                            <p class="ticket__theme ticket__cell">
                                {{ ticket.theme }}
                            </p>
                            <p class="ticket__description-problem ticket__cell">
                                {{ ticket.problem }}
                            </p>
                            <img
                                :src="getStaticUrl('ico-more-vertical.svg')"
                                alt=""
                                class="ticket__btn"
                                @click="addActive(index)"
                            />
                            <div
                                class="ticket__more"
                                :class="{ active: activeLink == index }"
                            >
                                <div class="ticket__more-btn">
                                    <img
                                        :src="getStaticUrl('ico-check.svg')"
                                        alt=""
                                        class="ticket__more-ico"
                                    />
                                    <div class="ticket__more-text">
                                        Подробнее
                                    </div>
                                </div>
                                <div class="ticket__more-btn">
                                    <img
                                        :src="getStaticUrl('ico-message.svg')"
                                        alt=""
                                        class="ticket__more-ico"
                                    />
                                    <div class="ticket__more-text">Взять</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tickets__bottom">
                    <div class="tickets__all-tickets all-tickets">
                        <p class="all-tickets__text">Тикетов на странице:</p>
                        <select
                            name="select"
                            class="all-tickets__select"
                            v-model="paginate"
                        >
                            <option value="10" selected>10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div class="tickets__paginations paginations">
                        <img
                            :src="getStaticUrl('ico-arrow-left.svg')"
                            alt=""
                            class="paginations__btn paginations__btn_left"
                            @click="arrowBtn('left')"
                            ref="btnLeft"
                        />
                        <div class="paginations__pages">
                            <div
                                class="paginations__page-number"
                                :class="{ active: index == current }"
                                :key="index"
                                v-for="index in paginateTotal"
                                @click.prevent="updateCurrent(index)"
                            >
                                {{ index }}
                            </div>
                        </div>
                        <img
                            :src="getStaticUrl('ico-arrow-right.svg')"
                            alt=""
                            class="paginations__btn paginations__btn_right"
                            @click="arrowBtn('right')"
                            ref="btnRight"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import tickets from "../tickets";

export default {
    name: "tickets",
    data() {
        return {
            paginate: 10,
            paginateTotal: null,
            activeLink: null,
            tickets,
            current: 1,
            searchFilter: "",
            ticketNotTaken: []
        };
    },
    mounted() {
    },
    methods: {
        calculatesCountStatus(status) {
            let valueOnStatus = [];
            this.tickets.forEach(element => {
                if (element.status == status) {
                    valueOnStatus.push(element);
                }
            });
            return valueOnStatus.length
        },
        addActive(index) {
            if (this.activeLink === index) {
                this.activeLink = null;
            } else {
                this.activeLink = index;
            }
        },
        setPaginate(i) {
            if (this.current == 1) {
                return i < this.paginate;
            } else {
                return (
                    i >= this.paginate * (this.current - 1) &&
                    i < this.current * this.paginate
                );
            }
        },
        updateCurrent(i) {
            this.current = i;
        },
        arrowBtn(btn) {
            if (btn == "left") {
                this.current == 1 ? (this.current = 1) : (this.current -= 1);
            } else if (btn == "right") {
                this.current == this.paginateTotal
                    ? (this.current = this.paginateTotal)
                    : (this.current += 1);
            }
        },
        updatePaginate() {
            this.current = 1;

            this.paginate_total = Math.ceil(
                document.querySelectorAll(".ticket").length / this.paginate
            );
        },
    },
    created() {
        this.paginateTotal = this.tickets.length / this.paginate;
    },
    watch: {
        current(e) {
            if (e == 1) {
                this.$refs.btnLeft.classList.add("paginations__btn_block");
                return;
            } else if (e == this.paginateTotal) {
                this.$refs.btnRight.classList.add("paginations__btn_block");
                return;
            } else {
                this.$refs.btnRight.classList.remove("paginations__btn_block");
                this.$refs.btnLeft.classList.remove("paginations__btn_block");
                return;
            }
        },
        paginate(e) {
            this.paginateTotal = Math.ceil(this.tickets.length / e);
        }
    },
    computed: {
        filteredMovies() {
            if (this.searchFilter) {
                return this.tickets.filter(item => {
                    return item.theme.includes(this.searchFilter);
                });
            }
            return this.tickets
        },
    }
};
</script>

<style lang="less" src="./tickets.less"></style>
