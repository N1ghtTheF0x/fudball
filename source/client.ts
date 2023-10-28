import { ChannelResponse, TokenResponse } from "./response"

const BASE_URL = "https://kick.com"

export class Fudball
{
    private _token?: string
    public constructor(private readonly _base = BASE_URL)
    {

    }
    private async _request<O>(input: URL | RequestInfo,method: string,headers: Headers = new Headers()): Promise<O | null>
    {
        headers.set("Accept","application/json")
        if(this._token) headers.set("Authorization",`Bearer ${this._token}`)
       const response = await fetch(input,{method,headers,credentials: "include"})

       if(!response.ok)
       {
            console.error(`${input} failed! ${response.status}: ${response.statusText}`)
            return null
       }

       return await response.json()
    }
    public async fetchToken()
    {
        if(this._token) return this._token
        const token = await this.getToken()
        if(!token) throw new Error("Couldn't fetch Token!")
        return this._token = token.encryptedValidFrom
    }
    public async getChannel(slug: string)
    {
        await this.fetchToken()
        const url = new URL(`/api/v2/channels/${slug}`,this._base)
        return await this._request<ChannelResponse>(url,"GET")
    }
    public async getToken()
    {
        const url = new URL("/kick-token-provider",this._base)
        return await this._request<TokenResponse>(url,"GET")
    }
    public async getLivestream(slug: string)
    {
        await this.fetchToken()
        const url = new URL(`/api/v2/channels/${slug}/livestream`,this._base)
        return await this._request(url,"GET")
    }
    public async getChannelLeaderboards(slug: string)
    {
        await this.fetchToken()
        const url = new URL(`/api/v2/channels/${slug}/leaderboards`,this._base)
        return await this._request(url,"GET")
    }
    public async getEmotes(slug: string)
    {
        await this.fetchToken()
        const url = new URL(`/emotes/${slug}`,this._base)
        return await this._request(url,"GET")
    }
    public async getChatroom(slug: string)
    {
        await this.fetchToken()
        const url = new URL(`/api/v2/channels/${slug}/chatroom`,this._base)
        return await this._request(url,"GET")
    }
    public async getPolls(slug: string)
    {
        await this.fetchToken()
        const url = new URL(`/api/v2/channels/${slug}/polls`,this._base)
        return await this._request(url,"GET")
    }
    public async getLatestVideos(slug: string)
    {
        await this.fetchToken()
        const url = new URL(`/api/v2/channels/${slug}/videos/latest`)
        return await this._request(url,"GET")
    }
    public async getChatroomRules(slug: string)
    {
        await this.fetchToken()
        const url = new URL(`/api/v2/channels/${slug}/chatroom/rules`,this._base)
        return await this._request(url,"GET")
    }
}