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
                                Невзятые(34)
                            </div>
                        </div>
                        <div class="tickets__status">
                            <div class="tickets__status-text">Взятые(12)</div>
                        </div>
                        <div class="tickets__status">
                            <div class="tickets__status-text">Закрытые(25)</div>
                        </div>
                    </div>
                    <div class="tickets__search">
                        <div class="search">
                            <div class="search__box">
                                <input
                                    type="text"
                                    class="search__input"
                                    placeholder="Найти тикет..."
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
                        v-for="(ticket, index) in tickets"
                        :key="index"
                    >
                        <p class="ticket__number ticket__cell">
                            #{{ ticket.number }}
                        </p>
                        <div class="ticket__user ticket__cell">
                            <div
                                class="ticket__user-avatar"
                                :style="{
                                    backgroundImage: `url(${require('@/images/' +
                                        ticket.user.avatar)})`
                                }"
                            ></div>
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
                                <div class="ticket__more-text">Подробнее</div>
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
                <div class="tickets__bottom">
                    <div class="tickets__all-tickets all-tickets">
                        <p class="all-tickets__text">Тикетов на странице:</p>
                        <select name="select" class="all-tickets__select">
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
                        />
                        <div class="paginations__btn-left"></div>
                        <div class="paginations__pages">
                            <div class="paginations__page-number active">1</div>
                            <div class="paginations__page-number">2</div>
                            <div class="paginations__page-number">3</div>
                            <div class="paginations__page-number">...</div>
                            <div class="paginations__page-number">9</div>
                        </div>
                        <img
                            :src="getStaticUrl('ico-arrow-right.svg')"
                            alt=""
                            class="paginations__btn paginations__btn_right"
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
            activeLink: null,
            tickets
        };
    },
    methods: {
        addActive(index) {
            if (this.activeLink === index) {
                this.activeLink = null;
            } else {
                this.activeLink = index;
            }
        }
    },
    mounted() {}
};
</script>

<style lang="less" src="./tickets.less"></style>
